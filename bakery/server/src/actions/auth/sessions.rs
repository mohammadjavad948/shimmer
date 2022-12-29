use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{
    sea_orm::{ColumnTrait, EntityTrait, QueryFilter},
    session,
};
use std::sync::Arc;

pub async fn sessions(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<Vec<session::Model>>, StatusCode> {
    let user = session::Entity::find()
        .filter(session::Column::UserId.eq(user_info.user_id))
        .all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(user))
}
