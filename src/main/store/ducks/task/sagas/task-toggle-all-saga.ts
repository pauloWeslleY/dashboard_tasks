/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskToggleAll,
  setTaskError,
  setTaskFailure,
  setTaskPending,
  setTaskRequest,
  taskServices,
  type TaskToggleAllType,
} from '@/main/store/ducks/task';
import { type RootStateProps } from '@/main/store/types/redux.types';
import { type PayloadAction } from '@reduxjs/toolkit';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';

function* loadToggleAllTasksSaga(action: PayloadAction<TaskToggleAllType>) {
  yield put(setTaskPending(true));
  const state: RootStateProps = yield select();
  const tasks = state.task.data ?? [];

  try {
    yield delay(500);
    const updatedTasks: TaskModel[] = yield all(
      tasks.map((task) =>
        call(taskServices.toggleStatusTask, {
          taskId: task.id,
          status: action.payload.status,
        })
      )
    );

    const taskToggleStatus = tasks.map((task) => {
      const updatedTask = updatedTasks.find((t) => t.id === task.id);
      return updatedTask ?? task;
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

export function* toggleAllTasksSaga() {
  yield takeLatest(loadTaskToggleAll, loadToggleAllTasksSaga);
}
