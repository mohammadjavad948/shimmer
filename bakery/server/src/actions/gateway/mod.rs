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

    let mut room_reciever = state
        .rooms
        .room_reciever("global".into(), user.session_id.to_string())
        .await
        .unwrap();

    tokio::spawn(async move {
        while let Ok(data) = room_reciever.recv().await {
            sender.send(Message::Text(data)).await.unwrap();
        }
    });

    tokio::spawn(async move {
        while let Some(Ok(Message::Text(data))) = receiver.next().await {
            state
                .rooms
                .send_message_to_room("global".into(), data)
                .await
                .unwrap();
        }
    });
}
