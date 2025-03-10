import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config({
    path: `.env.dev`
})

export const connectionSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5444'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    schema: process.env.DATABASE_SCHEMA_NAME,
    logging: false,
    synchronize: false,
    migrationsRun: true,
    name: 'default',
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*{.ts,.js}']
});
