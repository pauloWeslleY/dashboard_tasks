import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TaskModel } from '@/data/models/task.model';

import { type TaskInfoStateType } from '../types/tasks-state.type';

const TASK_INFO_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies TaskInfoStateType as TaskInfoStateType;

const taskInfoSlice = createSlice({
  name: 'task-info',
  initialState: TASK_INFO_INITIAL_STATE,
  reducers: {
    setTaskInfoRequest: (state, { payload }: PayloadAction<TaskModel>) => {
      state.data = payload;
    },
    setTaskInfoSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setTaskInfoPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setTaskInfoError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setTaskInfoFailure: (state, { payload }: PayloadAction<Error | string | null>) => {
      state.error = payload;
    },
  },
});

export const { setTaskInfoRequest, setTaskInfoSuccess, setTaskInfoPending, setTaskInfoFailure, setTaskInfoError } =
  taskInfoSlice.actions;
export const taskInfoReducer = taskInfoSlice.reducer;
export function useStateTaskInfo(state: RootStateProps): TaskInfoStateType {
  return state.taskInfo;
}
