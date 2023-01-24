use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{
    card, cards_in_pocket,
    sea_orm::{ColumnTrait, EntityTrait, QueryFilter, QueryOrder, QuerySelect},
};
use std::sync::Arc;

pub async fn fetch_next(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<(database::card::Model, cards_in_pocket::Model)>, StatusCode> {
    let date = chrono::Utc::now();

    let data = cards_in_pocket::Entity::find()
        .filter(cards_in_pocket::Column::StartDate.lte(date))
        .filter(cards_in_pocket::Column::UserId.eq(user_info.user_id))
        .order_by(
            cards_in_pocket::Column::CreatedAt,
            database::sea_orm::Order::Desc,
        )
        .select_only()
        .column(cards_in_pocket::Column::CardId)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let card = card::Entity::find()
        .filter(card::Column::Id.eq(data.card_id))
        .select_only()
        .column(card::Column::Id)
        .column(card::Column::Question)
        .column(card::Column::Answers)
        .column(card::Column::CreatedAt)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json((card, data)))
}
