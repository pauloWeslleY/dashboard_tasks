import { type IAuth, type IFirebaseAuthToken } from '@/infra/services/firebase-auth';
import { FirebaseError } from 'firebase/app';
import { type Auth } from 'firebase/auth';

export class RemoteFirebaseAuthToken implements IFirebaseAuthToken {
  private token: string;
  private auth: Auth;

  constructor(protected dependencies: IAuth.Dependencies<Auth>) {
    this.auth = dependencies.auth;
    this.token = '';
  }

  async getFirebaseAuthToken(): Promise<RemoteFirebaseAuthToken.Model> {
    try {
      if (!this.auth.currentUser) {
        throw new Error('Usuário não encontrado');
      }

      this.token = await this.auth.currentUser.getIdToken();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new FirebaseError(error.code, error.message);
      }
    }

    return this.token;
  }
}

namespace RemoteFirebaseAuthToken {
  export type Model = string;
}
