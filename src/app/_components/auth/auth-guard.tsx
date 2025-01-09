'use client';

import React from 'react';
import { logger } from '@/main/lib/default-logger';

import { useAuthGuard } from './hooks';
import { type AuthGuardProps } from './types';

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const { isChecking } = useAuthGuard({ logger });

  if (isChecking) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
