use crate::{middleware::auth::UserInfo, state::State};
use axum::{
    extract::{Json, Path},
    http::StatusCode,
    Extension,
};
use database::{
    card_group,
    sea_orm::{ActiveModelTrait, ActiveValue, EntityTrait, IntoActiveModel},
};
use serde::Deserialize;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Payload {
    pub name: String,
}

// todo: auth user
pub async fn edit(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(_user_info): Extension<UserInfo>,
    Json(payload): Json<Payload>,
) -> Result<Json<card_group::Model>, StatusCode> {
    let data = card_group::Entity::find_by_id(id)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let mut data = data.into_active_model();

    data.name = ActiveValue::Set(payload.name);

    let data = data
        .update(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(data))
}
