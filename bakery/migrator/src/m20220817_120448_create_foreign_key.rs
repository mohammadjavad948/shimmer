use sea_orm_migration::prelude::*;

use crate::{m20220816_124525_create_card::Card, m20220816_111225_create_user::User, m20220816_123945_create_card_group::CardGroup, m20220816_174157_create_cards_in_pocket::CardsInPocket};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {

        manager.create_foreign_key(
            ForeignKey::create()
                .name("FK_user_card_owner")
                .from(Card::Table, Card::CreatorId)
                .to(User::Table, User::Id)
                .on_delete(ForeignKeyAction::Cascade)
                .on_update(ForeignKeyAction::Cascade)
                .to_owned()
        ).await?;

        manager.create_foreign_key(
            ForeignKey::create()
                .name("FK_card_card_group")
                .from(Card::Table, Card::GroupId)
                .to(CardGroup::Table, CardGroup::Id)
                .on_delete(ForeignKeyAction::Cascade)
                .on_update(ForeignKeyAction::Cascade)
                .to_owned()
        ).await?;

        manager.create_foreign_key(
            ForeignKey::create()
                .name("FK_card_pocket")
                .from(CardsInPocket::Table, CardsInPocket::CardId)
                .to(Card::Table, Card::Id)
                .on_delete(ForeignKeyAction::Cascade)
                .on_update(ForeignKeyAction::Cascade)
                .to_owned()
        ).await?;

        manager.create_foreign_key(
            ForeignKey::create()
                .name("FK_user_pocket")
                .from(CardsInPocket::Table, CardsInPocket::UserId)
                .to(User::Table, User::Id)
                .on_delete(ForeignKeyAction::Cascade)
                .on_update(ForeignKeyAction::Cascade)
                .to_owned()
        ).await?;

        manager.create_foreign_key(
            ForeignKey::create()
                .name("FK_user_card_group_owner")
                .from(CardGroup::Table, CardGroup::CreatorId)
                .to(User::Table, User::Id)
                .on_delete(ForeignKeyAction::Cascade)
                .on_update(ForeignKeyAction::Cascade)
                .to_owned()
        ).await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        Ok(())
    }
}

