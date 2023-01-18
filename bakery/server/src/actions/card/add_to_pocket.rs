use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{
    card, cards_in_pocket, pocket_history,
    sea_orm::{ActiveModelTrait, EntityTrait},
};
use serde::Deserialize;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Payload {
    pub card_id: i32,
}

pub async fn add_card_to_pocket(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
    Json(payload): Json<Payload>,
) -> Result<Json<cards_in_pocket::Model>, StatusCode> {
    let card = card::Entity::find_by_id(payload.card_id)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let pivot = cards_in_pocket::ActiveModel {
        card_id: database::sea_orm::ActiveValue::Set(payload.card_id),
        user_id: database::sea_orm::ActiveValue::Set(user_info.user_id),
        card_group_id: database::sea_orm::ActiveValue::Set(card.group_id),
        level: database::sea_orm::ActiveValue::Set(0),
        ..Default::default()
    }
    .insert(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    pocket_history::ActiveModel {
        message: database::sea_orm::ActiveValue::Set("Add card to pocket".into()),
        pocket_id: database::sea_orm::ActiveValue::Set(pivot.id),
        event: database::sea_orm::ActiveValue::Set("ADD".into()),
        ..Default::default()
    }
    .insert(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(pivot))
}
