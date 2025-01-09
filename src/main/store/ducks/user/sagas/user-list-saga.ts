/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  setUserError,
  setUserFailure,
  setUserPending,
  setUserRequest,
  UserActionsType,
  userServices,
} from '@/main/store/ducks/user';
import { type Task } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type UserModel } from '@/data/models/user.model';

function* loadUserListSaga() {
  yield put(setUserPending(true));

  try {
    yield delay(1000);
    const data: UserModel[] = yield call(userServices.get);

    yield put(setUserRequest(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setUserFailure(error.message));
      yield put(setUserError(true));
      return;
    }
  } finally {
    yield put(setUserPending(false));
  }
}

export function* userListSaga() {
  const task: Task = yield takeLatest(UserActionsType.LIST, loadUserListSaga);
  yield takeLatest(setUserRequest, () => {
    task.cancel();
  });
}
