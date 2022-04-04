const envfile = require('envfile');
const fs = require('fs');


const envFileContent = fs.readFileSync('.typeorm.env');
const parsedEnvFile = envfile.parse(envFileContent);

module.exports = {
    host: 'localhost',
    type: parsedEnvFile.DB_CONNECTION,
    username: parsedEnvFile.DB_USER,
    password: parsedEnvFile.DB_PASSWORD,
    database: parsedEnvFile.DB_NAME,
    port: parsedEnvFile.DB_PORT,
    synchronize: false,
    logging: true,
    migrationsRun: true,
    migrations: ['./dist/migrations/*.js'],
    entities: ['dist/**/*.entity.js'],

    cli: {
        migrationsDir: './src/migrations'
    }
};
