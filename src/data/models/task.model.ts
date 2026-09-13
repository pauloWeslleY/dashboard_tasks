import { type schema } from '@/infra/database/schemas';

export type TaskModel = typeof schema.tasksTable.$inferSelect;
