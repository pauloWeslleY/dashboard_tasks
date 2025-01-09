import { type TaskModel } from '@/data/models/task.model';

export enum STATUS_TASK {
  DONE = 'COMPLETED',
  NOT_DONE = 'NOT COMPLETED',
}

const TASK = {
  [STATUS_TASK.DONE]: 'COMPLETED',
  [STATUS_TASK.NOT_DONE]: 'NOT COMPLETED',
} as const;

export type StatusTaskType = (typeof TASK)[keyof typeof TASK];

export interface TableTaskRowsProps {
  tasks: TaskModel;
}
