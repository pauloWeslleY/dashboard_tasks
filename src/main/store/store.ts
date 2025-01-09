import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { userAuthenticatedListener } from './ducks/authentication';
import rootReducer from './root.reducer';
import rootSaga from './sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .prepend(userAuthenticatedListener.middleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
