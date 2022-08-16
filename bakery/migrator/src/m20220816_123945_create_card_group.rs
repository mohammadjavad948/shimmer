use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {

        manager
            .create_table(
                Table::create()
                    .table(CardGroup::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(CardGroup::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(CardGroup::Name).string().not_null())
                    .col(ColumnDef::new(CardGroup::IsPublic).boolean().not_null().default(false))
                    .col(ColumnDef::new(CardGroup::CreatorId).integer().not_null())
                    .col(ColumnDef::new(CardGroup::CreatedAt).date_time().not_null().extra("DEFAULT NOW()".into()))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {

        manager
            .drop_table(Table::drop().table(CardGroup::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum CardGroup {
    Table,
    Id,
    Name,
    IsPublic,
    CreatorId,
    CreatedAt
}
