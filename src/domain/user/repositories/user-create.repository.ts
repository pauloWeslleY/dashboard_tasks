import { type IFirebase } from '@/infra/services/firebase';
import { COLLECTION } from '@/infra/services/firebase/collections/collections';
import { FirebaseError } from 'firebase/app';
import { updateProfile, type UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

import { type IUser } from '../entities/user.interface';

interface UserCreateRepositoryParams {
  credential: UserCredential | null;
  user: IUser;
}

export interface IUserCreateRepository {
  save(params: UserCreateRepositoryParams): Promise<void>;
}

export class UserCreateRepository implements IUserCreateRepository {
  constructor(private readonly database: IFirebase) {}

  async save({ credential, user }: UserCreateRepositoryParams): Promise<void> {
    if (!credential) throw new Error('Não foi possível cadastrar usuário');

    const userId = credential.user.uid;

    try {
      const userDoc = doc(this.database.collection(COLLECTION.users), userId);
      const dataUser = this.createRepositoryAdapter({ user });

      await setDoc(userDoc, { ...dataUser });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }

    await updateProfile(credential.user, {
      displayName: user.username,
    });
  }

  private createRepositoryAdapter({ user }: Pick<UserCreateRepositoryParams, 'user'>): Omit<IUser, 'id'> {
    return {
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
  }
}
