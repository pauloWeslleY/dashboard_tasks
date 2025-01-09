import {
  type IUserCreateRepository,
  type IUserInfoRepository,
  type IUserListRepository,
  type IUserUpdateRepository,
} from '@/domain/user';

import { type AccountModel } from '@/data/models/account.model';
import { type UserModel } from '@/data/models/user.model';
import {
  type IUserCreate,
  type IUserCreateDTO,
  type IUserInfo,
  type IUserList,
  type IUserUpdate,
  type IUserUpdateDTO,
} from '@/data/usecases';

export interface IUserServices {
  create(params: IUserCreateDTO): Promise<AccountModel>;
  update(params: IUserUpdateDTO): Promise<UserModel>;
  get(): Promise<UserModel[]>;
}

export interface IUserServicesFactories {
  userCreate(): IUserCreate;
  userUpdate(): IUserUpdate;
  userInfo(): IUserInfo;
  userList(): IUserList;
}

export interface IUserRepositoriesFactory {
  created(): IUserCreateRepository;
  updated(): IUserUpdateRepository;
  getDetails(): IUserInfoRepository;
  getList(): IUserListRepository;
}
