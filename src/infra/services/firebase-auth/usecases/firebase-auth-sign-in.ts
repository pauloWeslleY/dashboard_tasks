import { type IAuth, type IFirebaseAuthSignIn } from '@/infra/services/firebase-auth';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';

export class RemoteFirebaseAuthSignIn implements IFirebaseAuthSignIn {
  private authResponse: IAuth.FirebaseModel;
  private auth: Auth;

  constructor(protected dependencies: IAuth.Dependencies<Auth>) {
    this.auth = dependencies.auth;
    this.authResponse = null;
  }

  async authSignIn(params: IAuth.FirebaseDTO): Promise<RemoteFirebaseAuthSignIn.Model> {
    try {
      this.authResponse = await signInWithEmailAndPassword(this.auth, params.email, params.password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new FirebaseError(error.code, error.message);
      }
    }

    return this.authResponse;
  }
}

namespace RemoteFirebaseAuthSignIn {
  export type Model = IAuth.FirebaseModel;
}
