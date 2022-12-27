use axum::routing::{get, post};
use axum::{middleware, Router};

use crate::actions::auth::{info, login, signup};
use crate::middleware::auth::auth_middleware;

pub fn routes() -> Router {
    Router::new().nest("/auth", auth())
}

fn auth() -> Router {
    Router::new()
        .route("/info", get(info))
        .layer(middleware::from_fn(auth_middleware))
        .route("/login", post(login))
        .route("/signup", post(signup))
}
