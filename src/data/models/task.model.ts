import { type ITask } from '@/domain/task/entities/task.interface';

export type TaskModel = Omit<ITask, 'createAt'> & {
  createAt: string;
};
