pub use sea_orm_migration::prelude::*;

mod m20220816_111225_create_user;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220816_111225_create_user::Migration),
        ]
    }
}
