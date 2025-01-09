/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { deleteUserCookies } from '@/infra/cache/cookies/user-cookies-adapter';
import {
  authService,
  loadAuthSignOut,
  setAuthError,
  setAuthFailure,
  setAuthPending,
  setLogout,
} from '@/main/store/ducks/authentication';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

function* loadAuthSignOutSaga() {
  yield put(setAuthPending(true));

  try {
    yield delay(500);
    yield call(authService.signOut);
    yield call(deleteUserCookies);
    yield put(setLogout());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setAuthFailure(error.message));
      yield put(setAuthError(true));
      yield put(setAuthPending(false));
    }
  } finally {
    yield put(setAuthPending(false));
  }
}

export function* authSignOutSaga() {
  yield takeLatest(loadAuthSignOut, loadAuthSignOutSaga);
}
