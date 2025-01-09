import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TaskFilterStateType } from '../types/tasks-state.type';

const TASK_FILTER_INITIAL_STATE = {
  taskCategory: '',
  taskDescription: '',
  taskStatus: '',
} satisfies TaskFilterStateType as TaskFilterStateType;

const taskFilter = createSlice({
  name: 'task-filter',
  initialState: TASK_FILTER_INITIAL_STATE,
  reducers: {
    setTaskCategory: (state, action: PayloadAction<string>) => {
      state.taskCategory = action.payload;
    },
    setTaskDescription: (state, action: PayloadAction<string>) => {
      state.taskDescription = action.payload;
    },
    setTaskStatus: (state, action: PayloadAction<string>) => {
      state.taskStatus = action.payload;
    },
  },
});

export const { setTaskCategory, setTaskDescription, setTaskStatus } = taskFilter.actions;
export const taskFilterReducer = taskFilter.reducer;
export function useStateTaskFilter(state: RootStateProps): TaskFilterStateType {
  return state.taskFilter;
}
