use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{card_group, sea_orm::ActiveModelTrait};
use serde::Deserialize;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Payload {
    pub name: String,
}

pub async fn create(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
    Json(payload): Json<Payload>,
) -> Result<Json<card_group::Model>, StatusCode> {
    let data = card_group::ActiveModel {
        name: database::sea_orm::ActiveValue::Set(payload.name),
        creator_id: database::sea_orm::ActiveValue::Set(user_info.user_id),
        ..Default::default()
    };

    let data = data
        .insert(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(data))
}
