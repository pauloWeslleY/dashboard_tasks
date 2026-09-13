import { type TaskModel } from '@/data/models/task.model';

export interface ITaskRepository {
  save(
    params: Pick<
      TaskModel,
      'id' | 'name' | 'description' | 'category'
    >
  ): Promise<TaskModel>;
  create(
    params: Pick<
      TaskModel,
      'name' | 'description' | 'category' | 'userId'
    >
  ): Promise<TaskModel>;
  status(id: string, status: boolean): Promise<TaskModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<TaskModel[]>;
  findById(id: string): Promise<TaskModel | null>;
}
