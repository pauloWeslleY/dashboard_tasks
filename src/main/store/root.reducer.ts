import { combineReducers } from '@reduxjs/toolkit';

import { menuNavReducer } from './ducks/menu-nav';
import { uploadFileReducer } from './ducks/upload-file';

const rootReducer = combineReducers({
  menuNav: menuNavReducer,
  uploadFile: uploadFileReducer,
});

export default rootReducer;
