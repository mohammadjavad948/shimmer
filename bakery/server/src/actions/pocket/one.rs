use crate::{middleware::auth::UserInfo, state::State};
use axum::{
    extract::{Json, Path},
    http::StatusCode,
    Extension,
};
use database::{
    cards_in_pocket, pocket_history,
    sea_orm::{ColumnTrait, EntityTrait, ModelTrait, QueryFilter},
};
use std::sync::Arc;

pub async fn one(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<(cards_in_pocket::Model, Vec<pocket_history::Model>)>, StatusCode> {
    let data = cards_in_pocket::Entity::find()
        .filter(cards_in_pocket::Column::CardId.eq(id))
        .filter(cards_in_pocket::Column::UserId.eq(user_info.user_id))
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let history = data
        .find_related(pocket_history::Entity)
        .all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json((data, history)))
}
