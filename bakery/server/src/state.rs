use axum_ws_rooms::RoomsManager;
use database::sea_orm::DatabaseConnection;

pub struct State {
    pub db: DatabaseConnection,
    pub rooms: RoomsManager,
}
