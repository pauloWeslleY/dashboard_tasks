import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { FirebaseError } from 'firebase/app';
import { getDocs, type Query, type QueryDocumentSnapshot } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';
import { type UserModel } from '@/data/models/user.model';

import { type IUserProfile } from '../entities/user.interface';
import { userAdapters } from './user-adapter';

export interface IUserListRepository {
  getUserList(userSnapshot: Query<unknown>): Promise<UserModel[]>;
}

export class UserListRepository implements IUserListRepository {
  private _user: IUserProfile[];

  constructor(private readonly date: IDayJsAdapter) {
    this._user = [];
  }

  async getUserList(userSnapshot: Query<unknown>): Promise<UserModel[]> {
    try {
      const userListDoc = await getDocs(userSnapshot);

      userListDoc.forEach((doc: QueryDocumentSnapshot<unknown>) => {
        const user = {} as IUserProfile;

        Object.assign(user, {
          ...(doc.data() as IUserProfile),
          id: doc.id,
        });

        this._user.push(user);
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }

    return this._user.map((user) => userAdapters.userInfoAdapter({ user, date: this.date }));
  }
}
