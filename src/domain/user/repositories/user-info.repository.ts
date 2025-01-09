import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { FirebaseError } from 'firebase/app';
import { getDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';
import { type UserModel } from '@/data/models/user.model';

import { type IUserProfile } from '../entities/user.interface';
import { userAdapters } from './user-adapter';

export interface IUserInfoRepository {
  getUserInfo(userDoc: DocumentReference): Promise<UserModel>;
}

export class UserInfoRepository implements IUserInfoRepository {
  private _userInfo: IUserProfile;

  constructor(private readonly date: IDayJsAdapter) {
    this._userInfo = {} as IUserProfile;
  }

  async getUserInfo(userDoc: DocumentReference): Promise<UserModel> {
    try {
      const userInfoDoc = await getDoc(userDoc);
      const data = userInfoDoc.data() as IUserProfile;

      Object.assign(this._userInfo, {
        ...data,
        id: userInfoDoc.id,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    return userAdapters.userInfoAdapter({ user: this._userInfo, date: this.date });
  }
}
