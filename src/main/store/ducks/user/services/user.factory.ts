import {
  UserCreate,
  UserCreateRepository,
  UserInfo,
  UserInfoRepository,
  UserList,
  UserListRepository,
  UserUpdate,
  UserUpdateRepository,
  type IUserCreateRepository,
  type IUserInfoRepository,
  type IUserListRepository,
  type IUserUpdateRepository,
} from '@/domain/user';
import { COLLECTION, DBFirebase } from '@/infra/services/firebase';
import { dateDayJsServices } from '@/main/factories/date-dayjs';

import { type IUserCreate, type IUserInfo, type IUserList, type IUserUpdate } from '@/data/usecases';

import { type IUserRepositoriesFactory, type IUserServicesFactories } from '../types/user.services.type';

const database = DBFirebase.database();

export class UserRepositoriesFactory implements IUserRepositoriesFactory {
  created(): IUserCreateRepository {
    return new UserCreateRepository(database);
  }
  updated(): IUserUpdateRepository {
    return new UserUpdateRepository(database);
  }
  getDetails(): IUserInfoRepository {
    return new UserInfoRepository(dateDayJsServices);
  }
  getList(): IUserListRepository {
    return new UserListRepository(dateDayJsServices);
  }
}

export class UserFactory implements IUserServicesFactories {
  constructor(private readonly userRepositories: IUserRepositoriesFactory) {}

  userCreate(): IUserCreate {
    return new UserCreate(this.userRepositories.created());
  }

  userUpdate(): IUserUpdate {
    return new UserUpdate({
      database,
      upload: DBFirebase.upload(),
      userInfoRepository: this.userRepositories.getDetails(),
      userUpdateRepository: this.userRepositories.updated(),
    });
  }

  userInfo(): IUserInfo {
    return new UserInfo({
      database,
      collection: COLLECTION.tasks,
      userInfo: this.userRepositories.getDetails(),
    });
  }

  userList(): IUserList {
    return new UserList({
      database,
      collection: COLLECTION.tasks,
      userListRepository: this.userRepositories.getList(),
    });
  }
}
