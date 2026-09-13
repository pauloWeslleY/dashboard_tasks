import { type TaskModel } from '@/data/models/task.model';

export interface ITaskRepository {
  save(
    params: Omit<TaskModel, 'createAt' | 'updateAt'>
  ): Promise<TaskModel>;
  create(
    params: Omit<TaskModel, 'createAt' | 'id' | 'updateAt'>
  ): Promise<TaskModel>;
  status(id: string, status: boolean): Promise<TaskModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<TaskModel[]>;
  findById(id: string): Promise<TaskModel | null>;
}
