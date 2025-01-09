/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskDeleteAll,
  setTaskError,
  setTaskFailure,
  setTaskPending,
  setTaskRequest,
  taskServices,
} from '@/main/store/ducks/task';
import { type RootStateProps } from '@/main/store/types/redux.types';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';

function* loadDeleteAllTasksSaga() {
  yield put(setTaskPending(true));
  const state: RootStateProps = yield select();
  const tasks = state.task.data ?? [];

  try {
    yield delay(500);
    yield all(tasks.map((task) => call(taskServices.delete, { taskId: task.id })));
    const data: TaskModel[] = yield call(taskServices.get);

    yield put(setTaskRequest([...data]));
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

export function* deleteAllTasksSaga() {
  yield takeLatest(loadTaskDeleteAll, loadDeleteAllTasksSaga);
}
