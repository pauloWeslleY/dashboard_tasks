import { type IAuth, type IFirebaseSignOut } from '@/infra/services/firebase-auth';
import { FirebaseError } from 'firebase/app';
import { signOut, type Auth } from 'firebase/auth';

export class RemoteFirebaseSignOut implements IFirebaseSignOut {
  private auth: Auth;

  constructor(protected dependencies: IAuth.Dependencies<Auth>) {
    this.auth = dependencies.auth;
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new FirebaseError(error.code, error.message);
      }
    }
  }
}
