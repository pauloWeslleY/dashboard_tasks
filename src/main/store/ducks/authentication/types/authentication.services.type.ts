import { type IAuth } from '@/infra/services/firebase-auth';

import { type AccountModel } from '@/data/models/account.model';
import { type IAuthentication } from '@/data/usecases';

export interface AuthenticationServiceType {
  login: IAuthentication;
}

export interface IAuthServices {
  signIn(params: IAuth.FirebaseDTO): Promise<AccountModel>;
  signOut(): Promise<void>;
}
