import { type IFirebaseAuthSignUp } from '@/infra/services/firebase-auth';
import { FirebaseError } from 'firebase/app';
import { type UserCredential } from 'firebase/auth';

import { AppError } from '@/data/errors/usecases/app-error';
import { type IAddAccount, type IAddAccountDTO } from '@/data/usecases';

interface RemoteAddAccountDependencies {
  auth: IFirebaseAuthSignUp;
}

export class RemoteAddAccount implements IAddAccount {
  private credential: UserCredential | null;
  private auth: IFirebaseAuthSignUp;

  constructor(protected dependencies: RemoteAddAccountDependencies) {
    this.auth = dependencies.auth;
    this.credential = null;
  }

  async register(params: IAddAccountDTO): Promise<RemoteAddAccount.Model> {
    try {
      this.credential = await this.auth.authSignUp(params);
    } catch (error: unknown) {
      console.log('Error authentication => ', error);
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    if (!this.credential) {
      throw new Error('Error ao cadastrar conta');
    }

    return this.credential;
  }
}

namespace RemoteAddAccount {
  export type Model = UserCredential;
}
