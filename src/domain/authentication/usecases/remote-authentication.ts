import { type IFirebaseAuthSignIn } from '@/infra/services/firebase-auth';
import { FirebaseError } from 'firebase/app';

import { AppError } from '@/data/errors/usecases/app-error';
import { type AccountModel } from '@/data/models/account.model';
import { type IAuthentication, type IAuthenticationDTO } from '@/data/usecases';

import { authenticationAdapter } from './authentication-adapter';

interface RemoteAuthenticationDependencies {
  auth: IFirebaseAuthSignIn;
}

export class RemoteAuthentication implements IAuthentication {
  private account: AccountModel | null;
  private auth: IFirebaseAuthSignIn;

  constructor(protected dependencies: RemoteAuthenticationDependencies) {
    this.auth = dependencies.auth;
    this.account = null;
  }

  async authentication(params: IAuthenticationDTO): Promise<RemoteAuthentication.Model> {
    try {
      const credential = await this.auth.authSignIn(params);

      if (!credential) {
        throw new Error('Falha na autenticação');
      }

      const accessToken = await credential.user.getIdToken();
      this.account = authenticationAdapter({
        user: credential.user,
        token: accessToken,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    if (!this.account) {
      throw new Error('Falha ao autenticar o usuário');
    }

    return this.account;
  }
}

namespace RemoteAuthentication {
  export type Model = AccountModel;
}
