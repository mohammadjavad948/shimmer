use axum::routing::{get, post};
use axum::{middleware, Router};

use crate::actions::auth::{info, login, signup};
use crate::actions::card_group;
use crate::actions::gateway::websocket_handler;
use crate::middleware::auth::auth_middleware;

pub fn routes() -> Router {
    Router::new()
        .nest("/auth", auth())
        .nest("/card-group", card_group())
        .route("/gateway", get(websocket_handler))
}

fn auth() -> Router {
    Router::new()
        .route("/info", get(info))
        .layer(middleware::from_fn(auth_middleware))
        .route("/login", post(login))
        .route("/signup", post(signup))
}

fn card_group() -> Router {
    Router::new()
        .route(
            "/",
            get(card_group::all::all).post(card_group::create::create),
        )
        .route(
            "/:id",
            get(card_group::one::one)
                .patch(card_group::edit::edit)
                .delete(card_group::delete::delete),
        )
        .layer(middleware::from_fn(auth_middleware))
}
