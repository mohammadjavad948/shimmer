use axum::routing::post;
use axum::Router;

use crate::actions::auth::{login, signup};

pub fn routes() -> Router {
    Router::new()
        .route("/auth/login", post(login::login))
        .route("/auth/signup", post(signup::signup))
}
