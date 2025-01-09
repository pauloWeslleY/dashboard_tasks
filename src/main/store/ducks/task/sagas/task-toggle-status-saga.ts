/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskToggleStatus,
  setTaskError,
  setTaskFailure,
  setTaskPending,
  setTaskRequest,
  taskServices,
} from '@/main/store/ducks/task';
import { type RootStateProps } from '@/main/store/types/redux.types';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';
import { type ITaskUpdateStatusDTO } from '@/data/usecases';

function* loadTaskToggleStatusSaga(action: PayloadAction<ITaskUpdateStatusDTO>) {
  yield put(setTaskPending(true));
  const state: RootStateProps = yield select();
  const tasks = state.task.data ?? [];

  try {
    yield delay(500);
    const data: TaskModel = yield call(taskServices.toggleStatusTask, action.payload);

    const taskToggleStatus = tasks.map((task) => {
      return task.id === action.payload.taskId ? { ...data, status: action.payload.status } : task;
    });

    yield put(setTaskRequest(taskToggleStatus));
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);
      yield put(setTaskFailure(error.message));
      yield put(setTaskError(true));
      yield put(setTaskPending(false));
    }
  } finally {
    yield put(setTaskPending(false));
  }
}

export function* toggleTaskStatusSaga() {
  yield takeLatest(loadTaskToggleStatus, loadTaskToggleStatusSaga);
}
