import { useStateAuth } from '@/main/store/ducks/authentication';
import { useStateUserInfo } from '@/main/store/ducks/user';
import { useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseAccountInfoProps } from '../types';

export function useAccountInfo(): UseAccountInfoProps {
  const { data: userAuthenticated } = useAppSelector(useStateAuth);
  const loadUserInfo = useAppSelector(useStateUserInfo);

  return {
    userAuthenticated,
    isPendingUserUpdate: loadUserInfo.isLoading,
  };
}
