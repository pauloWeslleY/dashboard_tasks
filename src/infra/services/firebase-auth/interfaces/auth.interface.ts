import { type UserCredential } from 'firebase/auth';

export namespace IAuth {
  export interface Dependencies<T> {
    auth: T;
  }

  export interface FirebaseDTO {
    email: string;
    password: string;
  }

  export type FirebaseModel = UserCredential | null;
}
