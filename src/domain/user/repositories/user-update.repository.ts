import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { FirebaseError } from 'firebase/app';
import { updateProfile, type User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

import { type IUserProfile } from '../entities/user.interface';

interface IUserUpdateParams {
  user: IUserProfile;
  credential: User;
}

export interface IUserUpdateRepository {
  updated(params: IUserUpdateParams): Promise<void>;
}

export class UserUpdateRepository implements IUserUpdateRepository {
  constructor(private readonly database: IFirebase) {}

  async updated({ user, credential }: IUserUpdateParams): Promise<void> {
    try {
      const userDocRef = doc(this.database.getDB(), COLLECTION.users, credential.uid);
      const userProfile = this.userUpdatedAdapter({ user });

      await updateDoc(userDocRef, { ...userProfile });
      await updateProfile(credential, {
        displayName: user.username,
        photoURL: user.photoURL,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }
  }

  private userUpdatedAdapter({ user }: Pick<IUserUpdateParams, 'user'>): Omit<IUserProfile, 'id'> {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      photoURL: user.photoURL,
      dateOfBirth: user.dateOfBirth,
      address: user.address
        ? {
            city: user.address.city,
            state: user.address.state,
          }
        : null,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    };
  }
}
