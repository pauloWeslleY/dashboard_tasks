import { type IDatabase } from '@/infra/database';
import { schema } from '@/infra/database/schemas';
import { eq } from 'drizzle-orm';

import { type TaskModel } from '@/data/models/task.model';

import { type ITaskRepository } from './task-repository.interface';

export class TaskRepository implements ITaskRepository {
  constructor(private db: IDatabase) {}

  async create(
    params: Omit<TaskModel, 'id' | 'createAt' | 'updateAt'>
  ): Promise<TaskModel> {
    const [result] = await this.db
      .insert(schema.tasksTable)
      .values({
        name: params.name,
        description: params.description,
        category: params.category,
        status: params.status,
        userId: params.userId,
      })
      .returning();

    return result;
  }

  async save(
    params: Omit<TaskModel, 'createAt' | 'updateAt'>
  ): Promise<TaskModel> {
    const [result] = await this.db
      .update(schema.tasksTable)
      .set({
        name: params.name,
        description: params.description,
        category: params.category,
      })
      .where(eq(schema.tasksTable.id, params.id))
      .returning();

    return result;
  }

  async status(id: string, status: boolean): Promise<TaskModel> {
    const [result] = await this.db
      .update(schema.tasksTable)
      .set({ status })
      .where(eq(schema.tasksTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(schema.tasksTable)
      .where(eq(schema.tasksTable.id, id));
  }

  async findAll(): Promise<TaskModel[]> {
    const result = await this.db.select().from(schema.tasksTable);
    return result;
  }

  async findById(id: string): Promise<TaskModel | null> {
    const [result] = await this.db
      .select()
      .from(schema.tasksTable)
      .where(eq(schema.tasksTable.id, id));
    return result || null;
  }
}
