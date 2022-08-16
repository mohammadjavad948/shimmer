pub use sea_orm_migration::prelude::*;

mod m20220816_111225_create_user;
mod m20220816_123945_create_card_group;
mod m20220816_124525_create_card;
mod m20220816_174157_create_cards_in_pocket;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220816_111225_create_user::Migration),
            Box::new(m20220816_123945_create_card_group::Migration),
            Box::new(m20220816_124525_create_card::Migration),
            Box::new(m20220816_174157_create_cards_in_pocket::Migration),
        ]
    }
}
