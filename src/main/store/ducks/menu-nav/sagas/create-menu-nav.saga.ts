import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

import { createMenuNavActionType } from '../actions/menu-nav.actions';
import { setMenuNavState } from '../reducers/menu-nav.reducer';

const MENU_TASK_STORAGE_KEY = '@TASK_MENU_NAV';

export function* saveMenuNavSaga(action: PayloadAction<boolean>) {
  localStorage.setItem(
    MENU_TASK_STORAGE_KEY,
    JSON.stringify({ isMenuNavOpen: action.payload })
  );

  yield put(setMenuNavState(action.payload));
}

export function* createMenuNavSaga() {
  yield takeLatest(createMenuNavActionType, saveMenuNavSaga);
}
