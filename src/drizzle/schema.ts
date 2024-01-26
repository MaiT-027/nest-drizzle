import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 20 }).notNull(),
  username: varchar('username', { length: 20 }).unique().notNull(),
  password: varchar('password', { length: 100 }).notNull(),
});
