import { Env } from '@/env'
import { join } from 'path'
import { ConnectionOptions } from 'typeorm'

export const dbConnection: ConnectionOptions = {
    type: 'mysql',
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    username: Env.DB_USER,
    password: Env.DB_PASSWORD,
    database: Env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
}
