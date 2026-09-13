import { type schema } from '@/infra/database/schemas';

export type UserModel = typeof schema.usersTable.$inferInsert;
