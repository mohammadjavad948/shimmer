use crate::{middleware::auth::UserInfo, state::State};
use axum::{
    extract::{Json, Path},
    http::StatusCode,
    Extension,
};
use database::{card, sea_orm::EntityTrait};
use std::sync::Arc;

// todo: auth user
pub async fn one(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(_user_info): Extension<UserInfo>,
) -> Result<Json<card::Model>, StatusCode> {
    let data = card::Entity::find_by_id(id)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(data))
}
