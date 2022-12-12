use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(CardsInPocket::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(CardsInPocket::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(CardsInPocket::CardId).integer().not_null())
                    .col(ColumnDef::new(CardsInPocket::UserId).integer().not_null())
                    .col(
                        ColumnDef::new(CardsInPocket::StartDate)
                            .date_time()
                            .not_null()
                            .extra("DEFAULT NOW()".into()),
                    )
                    .col(
                        ColumnDef::new(CardsInPocket::Level)
                            .integer()
                            .not_null()
                            .default(1),
                    )
                    .col(ColumnDef::new(CardsInPocket::History).json().not_null())
                    .col(
                        ColumnDef::new(CardsInPocket::CreatedAt)
                            .date_time()
                            .not_null()
                            .extra("DEFAULT NOW()".into()),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(CardsInPocket::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum CardsInPocket {
    Table,
    Id,
    CardId,
    UserId,
    StartDate,
    History,
    Level,
    CreatedAt,
}
