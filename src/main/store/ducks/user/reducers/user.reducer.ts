import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type UserModel } from '@/data/models/user.model';

import { type UserStateType } from '../types/user-state.type';

const USER_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies UserStateType as UserStateType;

const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUserRequest: (state, { payload }: PayloadAction<UserModel[]>) => {
      state.data = payload;
    },
    setUserSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setUserPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUserError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setUserFailure: (state, { payload }: PayloadAction<Error | string | null>) => {
      state.error = payload;
    },
  },
});

export const { setUserRequest, setUserSuccess, setUserPending, setUserFailure, setUserError } = userSlice.actions;
export const userReducer = userSlice.reducer;
export function useStateUser(state: RootStateProps): UserStateType {
  return state.user;
}
