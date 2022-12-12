//! SeaORM Entity. Generated by sea-orm-codegen 0.9.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "cards_in_pocket")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub card_id: i32,
    pub user_id: i32,
    pub start_date: DateTime,
    pub level: i32,
    pub history: Json,
    pub created_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::card::Entity",
        from = "Column::CardId",
        to = "super::card::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Card,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    User,
}

impl Related<super::card::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Card.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
