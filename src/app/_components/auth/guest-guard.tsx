'use client';

import React, { type ReactNode } from 'react';
import { logger } from '@/main/lib/default-logger';

import { useGuestGuard } from './hooks/use-guest-guard';

export function GuestGuard({ children }: { children: ReactNode }) {
  const { isChecking } = useGuestGuard({ logger });

  if (isChecking) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
