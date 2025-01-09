import { type ReactNode } from 'react';
import { type LoggerType } from '@/main/lib/logger';

export namespace UseGuestGuard {
  export interface Model {
    isChecking: boolean;
  }

  export type Params = LoggerType;
}

export interface GuestGuardProps {
  children: ReactNode;
}
