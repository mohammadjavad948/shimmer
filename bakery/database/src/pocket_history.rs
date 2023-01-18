//! `SeaORM` Entity. Generated by sea-orm-codegen 0.10.6

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "pocket_history")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub event: String,
    pub pocket_id: i32,
    pub message: String,
    pub created_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::cards_in_pocket::Entity",
        from = "Column::PocketId",
        to = "super::cards_in_pocket::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    CardsInPocket,
}

impl Related<super::cards_in_pocket::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CardsInPocket.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
