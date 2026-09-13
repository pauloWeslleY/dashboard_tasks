import { all } from 'redux-saga/effects';

import { createMenuNavSaga } from '../ducks/menu-nav/sagas/create-menu-nav.saga';
import { getMenuNavSaga } from '../ducks/menu-nav/sagas/menu-nav.saga';

export default function* rootSaga() {
  yield all([getMenuNavSaga(), createMenuNavSaga()]);
}
