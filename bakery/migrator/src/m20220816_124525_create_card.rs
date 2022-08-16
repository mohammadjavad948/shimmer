use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Card::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Card::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Card::Question).string().not_null())
                    .col(ColumnDef::new(Card::Answers).json().not_null())
                    .col(ColumnDef::new(Card::RealAnswer).json().not_null())
                    .col(ColumnDef::new(Card::GroupId).integer().not_null())
                    .col(ColumnDef::new(Card::CreatorId).integer().not_null())
                    .col(
                        ColumnDef::new(Card::CreatedAt)
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
            .drop_table(Table::drop().table(Card::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Card {
    Table,
    Id,
    Question,
    Answers,
    RealAnswer,
    CreatorId,
    GroupId,
    CreatedAt,
}
