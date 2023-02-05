use crate::{middleware::auth::UserInfo, state::State};
use axum::{
    extract::{Json, Path},
    http::StatusCode,
    Extension,
};
use chrono::{Days, Utc};
use database::{
    card, cards_in_pocket,
    pocket_history::{self, PocketEvent},
    sea_orm::{
        ActiveModelTrait, ColumnTrait, EntityTrait, IntoActiveModel, ModelTrait, QueryFilter,
    },
    ActiveValue,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Payload {
    pub answer_index: u64,
}

#[derive(Serialize)]
pub struct Response {
    pub answer: u64,
}

pub async fn submit_answer(
    Path(id): Path<i32>,
    Extension(state): Extension<Arc<State>>,
    Extension(user_info): Extension<UserInfo>,
    Json(payload): Json<Payload>,
) -> Result<Json<Response>, StatusCode> {
    // TODO check for date validation
    let pocket = cards_in_pocket::Entity::find()
        .filter(cards_in_pocket::Column::CardId.eq(id))
        .filter(cards_in_pocket::Column::UserId.eq(user_info.user_id))
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let card = pocket
        .find_related(card::Entity)
        .one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let answer = card.real_answer["index"]
        .as_u64()
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

    if answer == payload.answer_index {
        let mut date = Utc::now();
        date = date + Days::new(calc_days_by_level(pocket.level));

        let level = pocket.level;
        let id = pocket.id;

        let mut pocket = pocket.into_active_model();

        pocket.level = ActiveValue::Set(level + 1);
        pocket.start_date = ActiveValue::Set(date.into());

        pocket
            .update(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        pocket_history::ActiveModel {
            event: ActiveValue::Set(PocketEvent::RightAnswer.to_string()),
            message: ActiveValue::Set("Right Answer".into()),
            pocket_id: ActiveValue::Set(id),
            ..Default::default()
        }
        .insert(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    } else {
        let id = pocket.id;

        let mut pocket = pocket.into_active_model();

        pocket.level = ActiveValue::Set(1);
        pocket.start_date = ActiveValue::Set(Utc::now().into());

        pocket
            .update(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        pocket_history::ActiveModel {
            event: ActiveValue::Set(PocketEvent::WrongAnswer.to_string()),
            message: ActiveValue::Set("Wrong Answer".into()),
            pocket_id: ActiveValue::Set(id),
            ..Default::default()
        }
        .insert(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    return Ok(Json(Response { answer }));
}

fn calc_days_by_level(level: i32) -> u64 {
    // growth rate
    let multiple: f64 = (level * 8) as f64;

    multiple.sqrt().floor().round() as u64
}
