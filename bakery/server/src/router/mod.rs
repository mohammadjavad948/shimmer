use axum::routing::{get, post};
use axum::{middleware, Router};

use crate::actions::auth::{info, login, sessions, signup};
use crate::actions::gateway::websocket_handler;
use crate::actions::{card, card_group, pocket};
use crate::middleware::auth::auth_middleware;

pub fn routes() -> Router {
    Router::new()
        .nest("/auth", auth())
        .nest("/card-group", card_group())
        .nest("/card", card())
        .route("/gateway", get(websocket_handler))
}

fn auth() -> Router {
    Router::new()
        .route("/info", get(info))
        .route("/sessions", get(sessions))
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

fn card() -> Router {
    Router::new()
        .route("/", get(card::all::all).post(card::create::create))
        .route(
            "/:id",
            get(card::one::one)
                .patch(card::edit::edit)
                .delete(card::delete::delete),
        )
        .route(
            "/:id/pocket",
            get(pocket::one::one).post(card::add_to_pocket::add_card_to_pocket),
        )
        .route("/fetch", get(pocket::fetch_next::fetch_next))
        .layer(middleware::from_fn(auth_middleware))
}
