use std::{collections::HashSet, sync::Arc};

use database::sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use database::{session, user};
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

use axum::{
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};

use crate::helpers::hash_token;
use crate::state::State;

pub async fn get_user_data(
    db: &DatabaseConnection,
    user_id: i32,
) -> Result<Option<user::Model>, StatusCode> {
    user::Entity::find_by_id(user_id)
        .one(db)
        .await
        .map_err(|e| {
            eprintln!("{e}");

            StatusCode::UNAUTHORIZED
        })
}

pub async fn get_user_session(
    db: &DatabaseConnection,
    user_id: i32,
    session_hash: String,
) -> Result<Option<session::Model>, StatusCode> {
    session::Entity::find()
        .filter(session::Column::SessionHash.eq(session_hash))
        .filter(session::Column::UserId.eq(user_id))
        .one(db)
        .await
        .map_err(|_| StatusCode::UNAUTHORIZED)
}

#[derive(Clone)]
pub struct UserInfo {
    pub user_id: i32,
    pub session_id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JWTPayload {
    pub id: i32,
}

pub async fn auth_middleware<B>(
    mut req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    // get header
    let auth_header = req
        .headers()
        .get("auth")
        .and_then(|header| header.to_str().ok())
        .ok_or(StatusCode::UNAUTHORIZED)?;

    let secret = std::env::var("SECRET").map_err(|_| StatusCode::UNAUTHORIZED)?;

    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = false;
    validation.validate_nbf = false;
    validation.required_spec_claims = HashSet::new();

    // decode token
    let token_message = decode::<JWTPayload>(
        auth_header,
        &DecodingKey::from_secret(secret.as_ref()),
        &validation,
    )
    .map_err(|_| StatusCode::UNAUTHORIZED)?;

    let hash = hash_token(auth_header.to_string());

    let state: &Arc<State> = req
        .extensions()
        .get()
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

    let session = get_user_session(&state.db, token_message.claims.id, hash)
        .await?
        .ok_or(StatusCode::UNAUTHORIZED)?;

    let user = UserInfo {
        user_id: session.user_id,
        session_id: session.id,
    };

    req.extensions_mut().insert(user);

    Ok(next.run(req).await)
}
