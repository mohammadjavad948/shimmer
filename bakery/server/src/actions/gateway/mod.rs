use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
    Extension,
};
use futures::{SinkExt, StreamExt};

use std::sync::Arc;

use crate::{
    middleware::auth::{check_auth_header, UserInfo},
    state::State,
};

pub async fn websocket_handler(
    ws: WebSocketUpgrade,
    Extension(state): Extension<Arc<State>>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| websocket(socket, state))
}

async fn websocket(stream: WebSocket, state: Arc<State>) {
    // By splitting we can send and receive at the same time.
    let (mut sender, mut receiver) = stream.split();
    let mut user = UserInfo {
        user_id: 0,
        session_id: 0,
    };

    // authenticate user if it fails close the socket if its ok then break the loop;
    while let Some(Ok(Message::Text(token))) = receiver.next().await {
        let info = check_auth_header(&token, state.clone()).await;

        match info {
            Ok(user_info) => {
                user = user_info;

                break;
            }
            Err(_) => {
                sender
                    .send(Message::Text("auth failed closing socket".to_string()))
                    .await
                    .unwrap();
                sender.close().await.unwrap();
                return;
            }
        }
    }

    state
        .rooms
        .init_user(user.session_id.to_string(), None)
        .await;

    state
        .rooms
        .join_room("global".into(), user.session_id.to_string())
        .await
        .unwrap();

    let mut user_receiver = state
        .rooms
        .get_user_receiver(user.session_id.to_string())
        .await
        .unwrap();

    let mut send_task = tokio::spawn(async move {
        while let Ok(data) = user_receiver.recv().await {
            sender.send(Message::Text(data)).await.unwrap();
        }
    });

    let rec_state = state.clone();
    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(Message::Text(data))) = receiver.next().await {
            if data.starts_with("join") {
                rec_state
                    .rooms
                    .join_room("room".into(), user.session_id.to_string())
                    .await
                    .unwrap();
            }

            if data.starts_with("send") {
                rec_state
                    .rooms
                    .send_message_to_room("room".into(), data)
                    .await
                    .unwrap();
            } else {
                rec_state
                    .rooms
                    .send_message_to_room("global".into(), data)
                    .await
                    .unwrap();
            }
        }
    });

    // If any one of the tasks exit, abort the other.
    tokio::select! {
        _ = (&mut send_task) => recv_task.abort(),
        _ = (&mut recv_task) => send_task.abort(),
    };

    state.rooms.end_user(user.session_id.to_string()).await;

    println!("everything done!");
}
