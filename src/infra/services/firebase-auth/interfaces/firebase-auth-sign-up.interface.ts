import { type IAuth } from './auth.interface';

export interface IFirebaseAuthSignUp {
  authSignUp(params: IAuth.FirebaseDTO): Promise<IAuth.FirebaseModel>;
}
