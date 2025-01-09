import { User } from '@/domain/user/entities/user';
import { FirebaseError } from 'firebase/app';

import { AppError } from '@/data/errors/usecases/app-error';
import { type AccountModel } from '@/data/models/account.model';
import { type IUserCreate, type IUserCreateDTO } from '@/data/usecases';

import { userAdapters } from '../repositories/user-adapter';
import { type IUserCreateRepository } from '../repositories/user-create.repository';

export class UserCreate implements IUserCreate {
  private _user: AccountModel | null;

  constructor(private readonly userRepository: IUserCreateRepository) {
    this._user = null;
  }

  async execute({ credential, username, firstName, lastName }: IUserCreateDTO): Promise<UserCreate.Model> {
    if (!credential) {
      throw new Error('Não foi possível cadastrar usuário');
    }

    if (!credential.user.email) {
      throw new Error('Falha ao cadastrar usuário');
    }

    try {
      const user = new User({
        id: credential.user.uid,
        email: credential.user.email,
        username,
        firstName,
        lastName,
      });

      const accessToken = await credential.user.getIdToken();
      await this.userRepository.save({ credential, user });
      this._user = userAdapters.userAdapter({ user, token: accessToken });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    if (!this._user) {
      throw new Error('Não foi possível cadastrar o usuário');
    }

    return this._user;
  }
}

namespace UserCreate {
  export type Model = AccountModel;
}
