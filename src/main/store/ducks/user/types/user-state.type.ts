import { type ReducerStateType } from '@/main/store/types/reducer.types';

import { type UserModel } from '@/data/models/user.model';

export type UserStateType = ReducerStateType & {
  data: UserModel[] | null;
};

export type UserInfoStateType = ReducerStateType & {
  data: UserModel | null;
};
