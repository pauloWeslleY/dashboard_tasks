import { RemoteAuthentication } from '@/domain/authentication';
import { DBFirebase } from '@/infra/services/firebase';
import { type IAuth } from '@/infra/services/firebase-auth';
import { authClient } from '@/main/lib/auth/client';

import { type AccountModel } from '@/data/models/account.model';

import { type AuthenticationServiceType, type IAuthServices } from '../types/authentication.services.type';

const database = DBFirebase.database();
const auth = database.auth();

function makeAuthenticationServices(): AuthenticationServiceType {
  const authLogin = new RemoteAuthentication({
    auth: DBFirebase.signInAuth(auth),
  });

  return {
    login: authLogin,
  };
}

export const authService: IAuthServices = {
  signIn: async (params: IAuth.FirebaseDTO): Promise<AccountModel> => {
    const { login } = makeAuthenticationServices();
    const data = await login.authentication(params);
    await authClient.signInWithPassword(data);
    return data;
  },
  signOut: async (): Promise<void> => {
    const logOut = DBFirebase.signOutAuth(auth);
    await logOut.signOut();
    await authClient.signOut();
  },
};
