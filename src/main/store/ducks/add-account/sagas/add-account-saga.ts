/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { savedUserCookies } from '@/infra/cache/cookies/user-cookies-adapter';
import { addAccountServices, loadAddAccount } from '@/main/store/ducks/add-account';
import {
  setAuthError,
  setAuthFailure,
  setAuthPending,
  setAuthRequest,
  setAuthSuccess,
} from '@/main/store/ducks/authentication';
import { userServices } from '@/main/store/ducks/user';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type UserCredential } from 'firebase/auth';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type AccountModel } from '@/data/models/account.model';

import { type AddAccountType } from '../types/add-account.type';

function* loadAddAccountSaga({ payload }: PayloadAction<AddAccountType>) {
  yield put(setAuthPending(true));

  try {
    yield delay(500);
    const credential: UserCredential = yield call(addAccountServices.create, {
      email: payload.email,
      password: payload.password,
    });

    const user: AccountModel = yield call(userServices.create, {
      credential,
      username: payload.username,
      lastName: payload.lastName,
      firstName: payload.firstName,
    });

    yield put(setAuthSuccess(true));
    yield put(setAuthRequest(user));
    yield call(savedUserCookies, { ...user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setAuthFailure(error.message));
      yield put(setAuthError(true));
    }
  } finally {
    yield put(setAuthPending(false));
  }
}

export function* addAccountSaga() {
  yield takeLatest(loadAddAccount, loadAddAccountSaga);
}
