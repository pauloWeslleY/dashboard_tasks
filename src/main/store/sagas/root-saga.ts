/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addAccountSaga } from '@/main/store/ducks/add-account';
import { authenticationSaga, authSignOutSaga } from '@/main/store/ducks/authentication';
import {
  createTaskSaga,
  deleteAllTasksSaga,
  deleteTaskSaga,
  taskInfoSaga,
  taskListSaga,
  toggleAllTasksSaga,
  toggleTaskStatusSaga,
  updateTaskSaga,
} from '@/main/store/ducks/task';
import { userListSaga, userUpdatedSaga } from '@/main/store/ducks/user';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    authenticationSaga(),
    authSignOutSaga(),
    addAccountSaga(),
    createTaskSaga(),
    updateTaskSaga(),
    taskListSaga(),
    taskInfoSaga(),
    deleteTaskSaga(),
    deleteAllTasksSaga(),
    toggleTaskStatusSaga(),
    toggleAllTasksSaga(),
    userListSaga(),
    userUpdatedSaga(),
  ]);
}
