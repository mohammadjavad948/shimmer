use database::sea_orm::DatabaseConnection;

pub struct State {
    pub db: DatabaseConnection,
}
