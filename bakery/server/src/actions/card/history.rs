use crate::{middleware::auth::UserInfo, state::State};
use axum::{
    extract::{Json, Path},
    http::StatusCode,
    Extension,
};
use database::{
    cards_in_pocket, pocket_history,
    sea_orm::{ColumnTrait, EntityTrait, QueryFilter},
};
use std::sync::Arc;

// todo: auth user
pub async fn history(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<Vec<pocket_history::Model>>, StatusCode> {
    let data = cards_in_pocket::Entity::find()
        .filter(cards_in_pocket::Column::CardId.eq(id))
        .filter(cards_in_pocket::Column::UserId.eq(user_info.user_id))
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let history = database::pocket_history::Entity::find()
        .filter(pocket_history::Column::PocketId.eq(data.id))
        .all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(history))
}
