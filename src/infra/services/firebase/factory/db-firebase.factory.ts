import { type Auth } from 'firebase/auth';

import {
  RemoteFirebaseAuthSignIn,
  RemoteFirebaseAuthSignUp,
  RemoteFirebaseSignOut,
  type IFirebaseAuthSignIn,
  type IFirebaseAuthSignUp,
  type IFirebaseSignOut,
} from '../../firebase-auth';
import { FirebaseUpload, type IUploadFile } from '../../firebase-upload';
import { initApp } from '../app-firebase-init';
import { type IFirebase } from '../interfaces/firebase.interface';
import { RemoteFirebase } from '../usecases/firebase';

export class DBFirebase {
  static database(): IFirebase {
    return new RemoteFirebase({ initApp: initApp.initializeApp() });
  }

  static signUpAuth(auth: Auth): IFirebaseAuthSignUp {
    return new RemoteFirebaseAuthSignUp({ auth });
  }

  static signInAuth(auth: Auth): IFirebaseAuthSignIn {
    return new RemoteFirebaseAuthSignIn({ auth });
  }

  static signOutAuth(auth: Auth): IFirebaseSignOut {
    return new RemoteFirebaseSignOut({ auth });
  }

  static upload(): IUploadFile {
    return new FirebaseUpload({ database: this.database() });
  }
}
