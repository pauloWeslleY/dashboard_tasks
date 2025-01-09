/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  setUserInfoError,
  setUserInfoFailure,
  setUserInfoPending,
  setUserInfoRequest,
  UserActionsType,
  userServices,
} from '@/main/store/ducks/user';
import { type PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { type UserModel } from '@/data/models/user.model';
import { type IUserUpdateDTO } from '@/data/usecases';

function* loadUserUpdateSaga(action: PayloadAction<IUserUpdateDTO>) {
  yield put(setUserInfoPending(true));
  console.log('User update pending', action);

  try {
    yield delay(500);
    const data: UserModel = yield call(userServices.update, {
      username: action.payload.username,
      phone: action.payload.phone,
      address: action.payload.address,
      dateOfBirth: action.payload.dateOfBirth,
      avatar: action.payload.avatar?.size !== 0 ? action.payload.avatar : null,
    });

    yield put(setUserInfoRequest(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setUserInfoError(true));
      yield put(setUserInfoFailure(error.message));
      yield put(setUserInfoPending(false));
    }
  } finally {
    yield put(setUserInfoPending(false));
  }
}

export function* userUpdatedSaga() {
  yield takeLatest(UserActionsType.UPDATE, loadUserUpdateSaga);
}
