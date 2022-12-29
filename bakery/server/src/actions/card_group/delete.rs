use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Path, http::StatusCode, Extension};
use database::{card_group, sea_orm::EntityTrait};
use std::sync::Arc;

// todo: auth user
pub async fn delete(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(_user_info): Extension<UserInfo>,
) -> Result<(), StatusCode> {
    card_group::Entity::delete_by_id(id)
        .exec(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(())
}
