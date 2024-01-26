import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'src/drizzle/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
  },
});
