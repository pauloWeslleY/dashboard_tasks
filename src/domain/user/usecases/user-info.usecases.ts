import { type CollectionsType, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type UserModel } from '@/data/models/user.model';
import { type IUserInfo, type IUserInfoDTO } from '@/data/usecases';

import { type IUserInfoRepository } from '../repositories/user-info.repository';

interface IUserInfoDependencies {
  database: IFirebase;
  collection: CollectionsType;
  userInfo: IUserInfoRepository;
}

export class UserInfo implements IUserInfo {
  private database: IFirebase;
  private collection: CollectionsType;
  private userInfo: IUserInfoRepository;

  constructor(protected readonly dependencies: IUserInfoDependencies) {
    this.database = dependencies.database;
    this.collection = dependencies.collection;
    this.userInfo = dependencies.userInfo;
  }

  async exec({ userId }: IUserInfoDTO): Promise<UserModel> {
    const userInfoDoc = doc(this.database.getDB(), this.collection, userId);
    return await this.userInfo.getUserInfo(userInfoDoc);
  }
}
