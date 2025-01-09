'use client';

import React from 'react';
import { logger } from '@/main/lib/default-logger';

import { useGuestGuard } from './hooks';
import { type GuestGuardProps } from './types';

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const { isChecking } = useGuestGuard({ logger });

  if (isChecking) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
