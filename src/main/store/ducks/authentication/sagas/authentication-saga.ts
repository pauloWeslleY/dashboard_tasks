/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { savedUserCookies } from '@/infra/cache/cookies/user-cookies-adapter';
import { type IAuth } from '@/infra/services/firebase-auth';
import {
  authService,
  loadAuthentication,
  setAuthError,
  setAuthFailure,
  setAuthPending,
  setAuthRequest,
  setAuthSuccess,
} from '@/main/store/ducks/authentication';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type AccountModel } from '@/data/models/account.model';

function* loadAuthenticationSaga({ payload }: PayloadAction<IAuth.FirebaseDTO>) {
  yield put(setAuthPending(true));

  try {
    yield delay(1000);
    const data: AccountModel = yield call(authService.signIn, { ...payload });

    yield put(setAuthSuccess(true));
    yield put(setAuthRequest(data));
    yield call(savedUserCookies, data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('loadAuthenticationSaga', error);
      yield put(setAuthFailure(error.message));
      yield put(setAuthError(true));
      yield put(setAuthPending(false));
      return;
    }
  } finally {
    yield put(setAuthPending(false));
  }
}

export function* authenticationSaga() {
  yield takeLatest(loadAuthentication, loadAuthenticationSaga);
}
