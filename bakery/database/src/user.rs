//! SeaORM Entity. Generated by sea-orm-codegen 0.9.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "user")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub name: String,
    pub icon: String,
    #[sea_orm(unique)]
    pub username: String,
    pub password: String,
    pub is_verified: bool,
    pub created_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::card::Entity")]
    Card,
    #[sea_orm(has_many = "super::cards_in_pocket::Entity")]
    CardsInPocket,
    #[sea_orm(has_many = "super::card_group::Entity")]
    CardGroup,
}

impl Related<super::card::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Card.def()
    }
}

impl Related<super::cards_in_pocket::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CardsInPocket.def()
    }
}

impl Related<super::card_group::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CardGroup.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}