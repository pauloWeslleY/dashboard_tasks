/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@/main/lib/default-logger';
import {
  loadTaskList,
  setTaskError,
  setTaskFailure,
  setTaskLoading,
  setTaskRequest,
  taskServices,
} from '@/main/store/ducks/task';
import { type Task } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';

function* loadTaskListSaga() {
  yield put(setTaskLoading(true));

  try {
    yield delay(1000);
    const data: TaskModel[] = yield call(taskServices.get);
    const orderTask = data.sort((a, b) => a.name.localeCompare(b.name));

    yield put(setTaskRequest(orderTask));
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);
      yield put(setTaskFailure(error.message));
      yield put(setTaskError(true));
      yield put(setTaskLoading(false));
    }
  } finally {
    yield put(setTaskLoading(false));
  }
}

export function* taskListSaga() {
  const task: Task = yield takeLatest(loadTaskList, loadTaskListSaga);
  yield takeLatest(setTaskRequest, () => {
    task.cancel();
  });
}
