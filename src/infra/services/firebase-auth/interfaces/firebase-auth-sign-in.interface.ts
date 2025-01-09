import { type IAuth } from './auth.interface';

export interface IFirebaseAuthSignIn {
  authSignIn(params: IAuth.FirebaseDTO): Promise<IAuth.FirebaseModel>;
}
