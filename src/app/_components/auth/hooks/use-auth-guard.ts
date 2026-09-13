import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/infra/auth/auth-client';
import { type LoggerType } from '@/main/lib/logger';
import { paths } from '@/main/paths';

export function useAuthGuard({ logger }: LoggerType) {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const {
    data: sessionData,
    isPending: sessionIsPending,
    error: sessionError,
  } = authClient.useSession();
  const router = useRouter();

  const checkAuthPermissions = useCallback((): void => {
    if (sessionIsPending) return;

    if (sessionError) {
      setIsChecking(false);
      return;
    }

    if (!sessionData?.user) {
      logger.debug(
        '[AuthGuard]: User is not logged in, redirecting to sign in'
      );
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [sessionData?.user, sessionError, sessionIsPending, router]);

  useEffect(() => {
    checkAuthPermissions();
  }, [checkAuthPermissions]);

  return {
    isChecking,
  };
}
