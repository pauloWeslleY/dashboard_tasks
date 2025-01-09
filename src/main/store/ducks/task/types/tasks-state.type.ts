import { type ReducerStateType } from '@/main/store/types/reducer.types';

import { type TaskModel } from '@/data/models/task.model';

export interface TaskFilterStateType {
  taskDescription: string;
  taskCategory: string;
  taskStatus: string;
}

export type TaskStateType = ReducerStateType & {
  data: TaskModel[] | null;
  isPending: boolean;
};

export type TaskInfoStateType = ReducerStateType & {
  data: TaskModel | null;
};

export interface TaskToggleAllType {
  status: boolean;
}
