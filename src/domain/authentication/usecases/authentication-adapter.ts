import { type User } from 'firebase/auth';

import { type AccountModel } from '@/data/models/account.model';

interface AuthenticationAdapter {
  user: User | undefined;
  token: string | undefined;
}

export function authenticationAdapter({ user, token }: AuthenticationAdapter): AccountModel | null {
  if (!user || !token) return null;

  if (!user.displayName || !user.email) return null;

  return {
    id: user.uid,
    email: user.email,
    username: user.displayName,
    accessToken: token,
  };
}
