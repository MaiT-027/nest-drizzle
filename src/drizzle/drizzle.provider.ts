import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = {
  provide: DrizzleAsyncProvider,
  useFactory: async () => {
    const mysqlConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT,
    });
    const db = drizzle(mysqlConnection, { schema, mode: 'default' });
    return db;
  },
  exports: [DrizzleAsyncProvider],
};
