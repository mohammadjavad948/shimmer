//! SeaORM Entity. Generated by sea-orm-codegen 0.9.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "card")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub question: String,
    pub answers: Json,
    pub real_answer: Json,
    pub group_id: i32,
    pub creator_id: i32,
    pub created_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::card_group::Entity",
        from = "Column::GroupId",
        to = "super::card_group::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    CardGroup,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::CreatorId",
        to = "super::user::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    User,
    #[sea_orm(has_many = "super::cards_in_pocket::Entity")]
    CardsInPocket,
}

impl Related<super::card_group::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CardGroup.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::cards_in_pocket::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CardsInPocket.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}