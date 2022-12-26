use axum::{Extension, Router};
use database::sea_orm::{Database, DatabaseConnection};
use router::routes;
use state::State;
use std::sync::Arc;

mod actions;
mod helpers;
mod middleware;
mod router;
mod state;

#[tokio::main]
async fn main() {
    let db_url = std::env::var("DATABASE_URL").unwrap();
    let db: DatabaseConnection = Database::connect(db_url).await.unwrap();

    let state = Arc::new(State { db });

    // build our application with a single route
    let app = Router::new().nest("/", routes()).layer(Extension(state));
    // run it with hyper on localhost:3000
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
