import { type CollectionsType, type IFirebase } from '@/infra/services/firebase';
import { query } from 'firebase/firestore';

import { type UserModel } from '@/data/models/user.model';
import { type IUserList } from '@/data/usecases';

import { type IUserListRepository } from '../repositories/user-list.repository';

interface IUserListDependencies {
  database: IFirebase;
  collection: CollectionsType;
  userListRepository: IUserListRepository;
}

export class UserList implements IUserList {
  private database: IFirebase;
  private collection: CollectionsType;
  private userListRepository: IUserListRepository;

  constructor(protected readonly dependencies: IUserListDependencies) {
    this.database = dependencies.database;
    this.collection = dependencies.collection;
    this.userListRepository = dependencies.userListRepository;
  }

  async exec(): Promise<UserModel[]> {
    const userQuery = query(this.database.collection(this.collection));
    const user = await this.userListRepository.getUserList(userQuery);
    return user;
  }
}
