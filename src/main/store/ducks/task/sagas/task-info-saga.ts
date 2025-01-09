/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  loadTaskInfo,
  setTaskInfoError,
  setTaskInfoFailure,
  setTaskInfoPending,
  setTaskInfoRequest,
  taskServices,
} from '@/main/store/ducks/task';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type TaskModel } from '@/data/models/task.model';
import { type ITaskInfoDTO } from '@/data/usecases';

function* loadTaskInfoSaga(action: PayloadAction<ITaskInfoDTO>) {
  yield put(setTaskInfoPending(true));

  try {
    yield delay(1000);
    const data: TaskModel = yield call(taskServices.getInfo, action.payload);

    yield put(setTaskInfoRequest(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('loadTaskInfoSaga', error);
      yield put(setTaskInfoFailure(error.message));
      yield put(setTaskInfoError(true));
    }
  } finally {
    yield put(setTaskInfoPending(false));
  }
}

export function* taskInfoSaga() {
  yield takeLatest(loadTaskInfo, loadTaskInfoSaga);
}
