use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{
    card, card_group,
    sea_orm::{ColumnTrait, EntityTrait, QueryFilter},
};
use std::sync::Arc;

pub async fn all(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<Vec<(card::Model, Option<card_group::Model>)>>, StatusCode> {
    let data = card::Entity::find()
        .filter(card::Column::CreatorId.eq(user_info.user_id))
        .find_also_related(card_group::Entity)
        .all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(data))
}
