use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(PocketHistory::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(PocketHistory::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(PocketHistory::Type).string().not_null())
                    .col(ColumnDef::new(PocketHistory::PocketId).integer().not_null())
                    .col(ColumnDef::new(PocketHistory::Message).string().not_null())
                    .col(
                        ColumnDef::new(PocketHistory::CreatedAt)
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
            .drop_table(Table::drop().table(PocketHistory::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum PocketHistory {
    Table,
    Id,
    PocketId,
    Type,
    Message,
    CreatedAt,
}
