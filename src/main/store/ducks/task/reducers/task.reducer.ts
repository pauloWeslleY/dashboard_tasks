import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TaskModel } from '@/data/models/task.model';

import { type TaskStateType } from '../types/tasks-state.type';

const TASK_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isPending: false,
} satisfies TaskStateType as TaskStateType;

const taskSlice = createSlice({
  name: 'tasks',
  initialState: TASK_INITIAL_STATE,
  reducers: {
    setTaskRequest: (state, { payload }: PayloadAction<TaskModel[]>) => {
      state.data = payload;
    },
    setTaskSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setTaskPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isPending = payload;
    },
    setTaskLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setTaskError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setTaskFailure: (state, { payload }: PayloadAction<Error | string | null>) => {
      state.error = payload;
    },
  },
});

export const { setTaskRequest, setTaskSuccess, setTaskPending, setTaskLoading, setTaskFailure, setTaskError } =
  taskSlice.actions;
export const taskReducer = taskSlice.reducer;
export function useStateTask(state: RootStateProps): TaskStateType {
  return state.task;
}
