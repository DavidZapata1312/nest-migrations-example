import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'perla',
    database: process.env.DB_NAME || 'nest_migrations_example',
    synchronize: false, // nunca true en producción
    logging: false,
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});


