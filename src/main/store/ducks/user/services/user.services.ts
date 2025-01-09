import { authClient } from '@/main/lib/auth/client';

import { type AccountModel } from '@/data/models/account.model';
import { type UserModel } from '@/data/models/user.model';
import { type IUserCreateDTO, type IUserUpdateDTO } from '@/data/usecases';

import { type IUserServices, type IUserServicesFactories } from '../types/user.services.type';
import { UserFactory, UserRepositoriesFactory } from './user.factory';

function makeUserServices(): IUserServicesFactories {
  const userRepositories = new UserRepositoriesFactory();
  return new UserFactory(userRepositories);
}

const userFactory: IUserServicesFactories = makeUserServices();

export const userServices: IUserServices = {
  create: async (params: IUserCreateDTO): Promise<AccountModel> => {
    const user = userFactory.userCreate();
    const data = await user.execute(params);
    await authClient.signUp(data);
    return data;
  },
  update: async (params: IUserUpdateDTO): Promise<UserModel> => {
    const user = userFactory.userUpdate();
    return await user.execute(params);
  },
  get: async (): Promise<UserModel[]> => {
    const user = userFactory.userList();
    return await user.exec();
  },
};
