use axum::{Extension, Router};
use database::sea_orm::{Database, DatabaseConnection};
use router::routes;
use state::State;
use std::{net::SocketAddr, sync::Arc};
use tracing::Level;

mod actions;
mod helpers;
mod middleware;
mod router;
mod state;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(Level::TRACE)
        .compact()
        .init();

    let db_url = std::env::var("DATABASE_URL").unwrap();
    let db: DatabaseConnection = Database::connect(db_url).await.unwrap();

    let rooms = axum_ws_rooms::RoomsManager::new();
    rooms.new_room("global".into(), None).await;

    let state = Arc::new(State { db, rooms });

    // build our application with a single route
    let app = Router::new()
        .nest("/", routes())
        .layer(Extension(state))
        .layer(tower_http::trace::TraceLayer::new_for_http());

    // run it with hyper on localhost:5000
    let addr = SocketAddr::from(([0, 0, 0, 0], 5000));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
