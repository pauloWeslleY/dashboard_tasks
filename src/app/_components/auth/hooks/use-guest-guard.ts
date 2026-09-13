import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/infra/auth/auth-client';
import { type LoggerType } from '@/main/lib/logger';
import { paths } from '@/main/paths';

export function useGuestGuard({ logger }: LoggerType) {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const {
    data: sessionData,
    isPending: sessionIsPending,
    error: sessionError,
  } = authClient.useSession();

  const router = useRouter();

  const checkGuestPermissions = useCallback((): void => {
    if (sessionIsPending) return;

    if (sessionError) {
      setIsChecking(false);
      return;
    }

    if (sessionData) {
      logger.debug(
        '[GuestGuard]: User is logged in, redirecting to dashboard'
      );
      router.push(paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [sessionData, sessionError, sessionIsPending]);

  useEffect(() => {
    checkGuestPermissions();
  }, [checkGuestPermissions]);

  return {
    isChecking,
  };
}
