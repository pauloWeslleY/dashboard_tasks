import { type ReducerStateType } from '@/main/store/types/reducer.types';
import { type User } from 'firebase/auth';

import { type AccountModel } from '@/data/models/account.model';

export type AuthenticationStateType = ReducerStateType & {
  data: AccountModel | null;
};

export interface UserAuthAdapterType {
  user: User;
  token: string;
}
