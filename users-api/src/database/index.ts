import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    database: 'users',
    username: 'users',
    password: 'SecurePassw0rd',
    host: 'users-db',
    dialect: 'postgres',
    port: 5432,
});

export async function configureDatabase() {
    try {
        await sequelize.authenticate();
        console.log('authenticated!');
    } catch {
        console.log(' :( ');
    }
}