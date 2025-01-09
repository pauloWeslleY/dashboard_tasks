import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type UserModel } from '@/data/models/user.model';

import { type UserInfoStateType } from '../types/user-state.type';

const USER_INFO_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
} satisfies UserInfoStateType as UserInfoStateType;

const userInfoSlice = createSlice({
  name: 'user-info',
  initialState: USER_INFO_INITIAL_STATE,
  reducers: {
    setUserInfoRequest: (state, { payload }: PayloadAction<UserModel>) => {
      state.data = payload;
    },
    setUserInfoSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setUserInfoPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUserInfoError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setUserInfoFailure: (state, { payload }: PayloadAction<Error | string | null>) => {
      state.error = payload;
    },
  },
});

export const { setUserInfoError, setUserInfoFailure, setUserInfoPending, setUserInfoRequest, setUserInfoSuccess } =
  userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
export function useStateUserInfo(state: RootStateProps): UserInfoStateType {
  return state.userInfo;
}
