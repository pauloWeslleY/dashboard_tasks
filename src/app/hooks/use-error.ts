import { useMemo } from 'react';
import { logger } from '@/main/lib/default-logger';

interface UseErrorType {
  errorMessage: string;
}

export function useError(error: Error | string | null): UseErrorType {
  const errorMessage = useMemo<string>(() => {
    return error instanceof Error ? error.message : error ?? '';
  }, [error]);

  logger.debug('errorMessage =>', errorMessage);

  return {
    errorMessage,
  };
}
