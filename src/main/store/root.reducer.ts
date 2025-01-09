import { combineReducers } from '@reduxjs/toolkit';

import { authenticationReducer } from './ducks/authentication';
import { menuNavReducer } from './ducks/menu-nav';
import { taskFilterReducer, taskInfoReducer, taskReducer } from './ducks/task';
import { uploadFileReducer } from './ducks/upload-file';
import { userInfoReducer, userReducer } from './ducks/user';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  taskFilter: taskFilterReducer,
  task: taskReducer,
  taskInfo: taskInfoReducer,
  user: userReducer,
  userInfo: userInfoReducer,
  menuNav: menuNavReducer,
  uploadFile: uploadFileReducer,
});

export default rootReducer;
