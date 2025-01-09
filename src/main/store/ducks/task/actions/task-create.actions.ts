import { createAction } from '@reduxjs/toolkit';

import {
  type ICreateTaskDTO,
  type IDeleteTaskDTO,
  type ITaskInfoDTO,
  type ITaskUpdateStatusDTO,
  type IUpdateTaskDTO,
} from '@/data/usecases';

import { type TaskToggleAllType } from '../types/tasks-state.type';
import { TASK_ACTIONS } from './task-actions';

export const loadTaskList = createAction(TASK_ACTIONS.list);
export const loadTaskInfo = createAction<ITaskInfoDTO>(TASK_ACTIONS.info);
export const loadTaskCreate = createAction<ICreateTaskDTO>(TASK_ACTIONS.create);
export const loadTaskUpdate = createAction<IUpdateTaskDTO>(TASK_ACTIONS.update);
export const loadTaskDelete = createAction<IDeleteTaskDTO>(TASK_ACTIONS.delete);
export const loadTaskToggleStatus = createAction<ITaskUpdateStatusDTO>(TASK_ACTIONS.toggleStatus);
export const loadTaskDeleteAll = createAction(TASK_ACTIONS.deleteAll);
export const loadTaskToggleAll = createAction<TaskToggleAllType>(TASK_ACTIONS.toggleAll);
