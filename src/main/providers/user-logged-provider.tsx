import React, { useCallback, useEffect, type ReactNode } from 'react';
import { loadUserAuthenticated } from '@/main/store/ducks/authentication';
import { useAppDispatch } from '@/main/store/hooks/use-redux';

export function UserLoggedProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const dispatch = useAppDispatch();

  const getUserLogged = useCallback(() => {
    dispatch(loadUserAuthenticated());
  }, [dispatch]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return <React.Fragment>{children}</React.Fragment>;
}
