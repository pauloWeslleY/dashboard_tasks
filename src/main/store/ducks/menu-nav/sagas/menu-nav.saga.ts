import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

import { getMenuNavActionType } from '../actions/menu-nav.actions';
import { setMenuNavState } from '../reducers/menu-nav.reducer';

const MENU_TASK_STORAGE_KEY = '@TASK_MENU_NAV';

export function* menuNavSaga() {
  const menuNavState: { isMenuNavOpen: boolean } = JSON.parse(
    localStorage.getItem(MENU_TASK_STORAGE_KEY) || '{}'
  );

  yield put(setMenuNavState(menuNavState.isMenuNavOpen));
}

export function* getMenuNavSaga() {
  yield takeLatest(getMenuNavActionType, menuNavSaga);
}
