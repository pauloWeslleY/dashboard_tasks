import { type IUser, type IUserProfile } from '@/domain/user/entities/user.interface';
import { type IDayJsAdapter } from '@/infra/adapters/dayjs';

import { type AccountModel } from '@/data/models/account.model';
import { type UserModel } from '@/data/models/user.model';

interface UserAdapterParams {
  user: IUser;
  token: string;
}

interface UserInfoAdapterParams {
  user: IUserProfile;
  date: IDayJsAdapter;
}

function userAdapter({ user, token }: UserAdapterParams): AccountModel {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    accessToken: token,
  };
}

function userInfoAdapter({ user, date }: UserInfoAdapterParams): UserModel {
  return {
    ...user,
    createdAt: date.formatDateAndHour({ date: user.createdAt, hours: true }),
    updateAt: date.formatDateAndHour({ date: user.updateAt, hours: true }),
  };
}

export const userAdapters = { userAdapter, userInfoAdapter };
