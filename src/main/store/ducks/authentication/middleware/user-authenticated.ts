import { DBFirebase } from '@/infra/services/firebase';
import { loadUserAuthenticated, setAuthRequest, type UserAuthAdapterType } from '@/main/store/ducks/authentication';
import { createListenerMiddleware } from '@reduxjs/toolkit';

import { type AccountModel } from '@/data/models/account.model';

export const userAuthenticatedListener = createListenerMiddleware();

function userAuthAdapter({ user, token }: UserAuthAdapterType): AccountModel | null {
  if (!user.email || !user.displayName) return null;

  return {
    id: user.uid,
    email: user.email,
    username: user.displayName,
    accessToken: token,
  };
}

userAuthenticatedListener.startListening({
  actionCreator: loadUserAuthenticated,
  effect: (_, { dispatch }) => {
    const database = DBFirebase.database();
    const auth = database.auth();

    auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const token = await user.getIdToken();
      const userAuth = userAuthAdapter({ user, token });

      if (!userAuth) return;

      dispatch(setAuthRequest(userAuth));
    });
  },
});
