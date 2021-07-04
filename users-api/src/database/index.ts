import { Sequelize } from "sequelize";

// TODO: This is definitely not the way passwords should be kept
// It should be taken from environment variable in a real-case scenario.
export const sequelize = new Sequelize('postgres://users:SecurePassw0rd@users-db:5432/users', {
    retry: {
        max: 100
    }
});

export async function configureDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log('Database connection works!');
    } catch {
        process.exit(1);
    }
}