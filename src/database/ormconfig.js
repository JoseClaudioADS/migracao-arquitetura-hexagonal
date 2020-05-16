const path = require('path');

module.exports = {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, '..', 'domain', '**', '*.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
    migrationsRun: true,
    cli: {
        migrationsDir: 'src/database/migrations',
    },
};
