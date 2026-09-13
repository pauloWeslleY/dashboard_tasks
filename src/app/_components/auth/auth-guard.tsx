'use client';

import React from 'react';
import { logger } from '@/main/lib/default-logger';

import { useAuthGuard } from './hooks/use-auth-guard';

export function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChecking } = useAuthGuard({ logger });

  if (isChecking) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
