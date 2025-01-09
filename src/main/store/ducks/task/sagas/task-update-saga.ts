/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskUpdate,
  setTaskError,
  setTaskFailure,
  setTaskPending,
  setTaskRequest,
  setTaskSuccess,
  taskServices,
} from '@/main/store/ducks/task';
import { type RootStateProps } from '@/main/store/types/redux.types';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';
import { type IUpdateTaskDTO } from '@/data/usecases';

import { hasValidTaskAlreadyExists } from '../validation/has-task-already-exist.validation';

function* loadTaskUpdateSaga(action: PayloadAction<IUpdateTaskDTO>) {
  yield put(setTaskPending(true));
  const state: RootStateProps = yield select();
  const tasks = state.task.data ?? [];

  if (hasValidTaskAlreadyExists(tasks, action.payload.nameTask)) {
    yield put(setTaskPending(false));
    yield put(setTaskFailure('Já existe tarefa com esse nome!'));
    yield put(setTaskError(true));
    logger.error('att task error');
    return;
  }

  try {
    yield delay(1000);
    const data: TaskModel = yield call(taskServices.update, action.payload);

    const updatedTask = tasks.map((task) => {
      return task.id === action.payload.taskId ? { ...data } : task;
    });

    yield put(setTaskRequest(updatedTask));
    yield put(setTaskSuccess(true));
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

export function* updateTaskSaga() {
  yield takeLatest(loadTaskUpdate, loadTaskUpdateSaga);
}
