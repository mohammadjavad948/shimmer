use crate::{middleware::auth::UserInfo, state::State};
use axum::{extract::Json, http::StatusCode, Extension};
use database::{sea_orm::EntityTrait, user};
use serde::Serialize;
use std::sync::Arc;

#[derive(Serialize)]
pub struct Response {
    pub user: user::Model,
}

pub async fn info(
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
) -> Result<Json<Response>, StatusCode> {
    let user = user::Entity::find_by_id(user_info.user_id)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(Response { user }))
}
