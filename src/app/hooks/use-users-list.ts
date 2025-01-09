import { useCallback, useEffect } from 'react';
import { UserActionsType, useStateUser } from '@/main/store/ducks/user';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type UserModel } from '@/data/models/user.model';

import { useError } from './use-error';

export interface UseUsersListType {
  loadUsersList: UserModel[];
  errorUsers: string;
  isErrorUsers: boolean;
  isSuccessUsers: boolean;
  isLoadingUsers: boolean;
}

export function useUsersList(): UseUsersListType {
  const users = useAppSelector(useStateUser);
  const dispatch = useAppDispatch();
  const { errorMessage } = useError(users.error);

  const getUserList = useCallback(() => {
    dispatch(UserActionsType.LIST());
  }, [dispatch]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return {
    loadUsersList: users.data ?? [],
    errorUsers: errorMessage,
    isErrorUsers: users.isError,
    isSuccessUsers: users.isSuccess,
    isLoadingUsers: users.isLoading,
  };
}
