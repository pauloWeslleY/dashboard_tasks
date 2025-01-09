/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskDelete,
  setTaskError,
  setTaskFailure,
  setTaskPending,
  setTaskRequest,
  taskServices,
} from '@/main/store/ducks/task';
import { type RootStateProps } from '@/main/store/types/redux.types';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { type IDeleteTaskDTO } from '@/data/usecases';

function* loadTaskDeleteSaga(action: PayloadAction<IDeleteTaskDTO>) {
  yield put(setTaskPending(true));
  const state: RootStateProps = yield select();
  const tasks = state.task.data ?? [];

  try {
    yield delay(500);
    yield call(taskServices.delete, action.payload);

    const deleteTask = tasks.filter((task) => task.id !== action.payload.taskId);

    yield put(setTaskRequest(deleteTask));
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

export function* deleteTaskSaga() {
  yield takeLatest(loadTaskDelete, loadTaskDeleteSaga);
}
