import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/main/paths';
import { useStateAuth } from '@/main/store/ducks/authentication';
import { useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseGuestGuard } from '../types/use-guest-guard.types';

export function useGuestGuard({ logger }: UseGuestGuard.Params): UseGuestGuard.Model {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { data: user, error, isLoading } = useAppSelector(useStateAuth);
  const router = useRouter();

  const checkGuestPermissions = useCallback((): void => {
    if (isLoading) return;

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      router.push(paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  useEffect(() => {
    checkGuestPermissions();
  }, [checkGuestPermissions]);

  return {
    isChecking,
  };
}
