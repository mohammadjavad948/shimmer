use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{card, sea_orm::ActiveModelTrait};
use serde::Deserialize;
use serde_json::Value;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Payload {
    pub question: String,
    pub answers: Value,
    pub real_answer: Value,
    pub group_id: i32,
}

pub async fn create(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
    Json(payload): Json<Payload>,
) -> Result<Json<card::Model>, StatusCode> {
    let data = card::ActiveModel {
        question: database::sea_orm::ActiveValue::Set(payload.question),
        answers: database::sea_orm::ActiveValue::Set(payload.answers),
        real_answer: database::sea_orm::ActiveValue::Set(payload.real_answer),
        creator_id: database::sea_orm::ActiveValue::Set(user_info.user_id),
        ..Default::default()
    };

    let data = data
        .insert(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(data))
}
