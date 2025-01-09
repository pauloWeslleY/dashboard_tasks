import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type AccountModel } from '@/data/models/account.model';

import { type AuthenticationStateType } from '../types/authentication-state.type';

const AUTH_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies AuthenticationStateType as AuthenticationStateType;

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    setAuthRequest: (state, { payload }: PayloadAction<AccountModel>) => {
      state.data = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setAuthPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setAuthFailure: (state, { payload }: PayloadAction<Error | string | null>) => {
      state.error = payload;
    },
    setLogout: (state) => {
      return { ...state, user: null };
    },
  },
});

export const { setAuthRequest, setAuthSuccess, setAuthPending, setAuthFailure, setAuthError, setLogout } =
  authenticationSlice.actions;
export const useStateAuth = (state: RootStateProps): AuthenticationStateType => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
