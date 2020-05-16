import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import ormConfig from './ormconfig.js';

export default async (name = 'default'): Promise<Connection> => {
    return createConnection(
        Object.assign(ormConfig as ConnectionOptions, {
            name,
            migrationsRun: process.env.NODE_ENV !== 'test',
            database:
                process.env.NODE_ENV === 'test'
                    ? 'cadastros_tests'
                    : ormConfig.database,
        }),
    );
};
