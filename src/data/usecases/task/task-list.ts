import { type TaskModel } from '@/data/models/task.model';

export interface ITaskList {
  exec(): Promise<TaskModel[]>;
}
