use crate::{helpers::hash_token, middleware::auth::JWTPayload, state::State};
use axum::{http::StatusCode, Extension, Json};
use database::{
    sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter},
    session, user,
};
use jsonwebtoken::{encode, EncodingKey, Header};
use pwhash::bcrypt;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Payload {
    pub username: String,
    pub password: String,
    pub name: String,
}

#[derive(Serialize)]
pub struct Response {
    pub user: user::Model,
    pub token: String,
}

pub async fn signup(
    Json(payload): Json<Payload>,
    Extension(state): Extension<State>,
) -> Result<Response, StatusCode> {
    // get secret
    let secret = std::env::var("SECRET").map_err(|_| StatusCode::UNAUTHORIZED)?;
    //get user
    let user = user::Entity::find()
        .filter(user::Column::Username.eq(payload.username.clone()))
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // if user exists return error
    if let Some(_) = user {
        return Err(StatusCode::BAD_REQUEST);
    }

    let password = bcrypt::hash(payload.password);

    // password hash successful
    if let Ok(pass_hash) = password {
        let user = user::ActiveModel {
            username: database::sea_orm::ActiveValue::Set(payload.username),
            name: database::sea_orm::ActiveValue::Set(payload.name),
            password: database::sea_orm::ActiveValue::Set(pass_hash),
            ..Default::default()
        };

        let user = user
            .insert(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        // create a new token
        let token_payload = JWTPayload { id: user.id };

        let token = encode(
            &Header::default(),
            &token_payload,
            &EncodingKey::from_secret(secret.as_ref()),
        )
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        let hash = hash_token(token.clone());

        let session = session::ActiveModel {
            user_id: database::sea_orm::ActiveValue::Set(user.id),
            session_hash: database::sea_orm::ActiveValue::Set(hash),
            ..Default::default()
        };

        session
            .insert(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        return Ok(Response { user, token });
    }

    Err(StatusCode::INTERNAL_SERVER_ERROR)
}
