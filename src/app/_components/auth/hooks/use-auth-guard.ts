import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/main/paths';
import { useStateAuth } from '@/main/store/ducks/authentication';
import { useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseAuthGuard } from '../types/use-auth-guard.types';

export function useAuthGuard({ logger }: UseAuthGuard.Params): UseAuthGuard.Model {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { data: user, error, isLoading } = useAppSelector(useStateAuth);
  const router = useRouter();

  const checkAuthPermissions = useCallback((): void => {
    if (isLoading) return;

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading, router]);

  useEffect(() => {
    checkAuthPermissions();
  }, [checkAuthPermissions]);

  return {
    isChecking,
  };
}
