import { type ReactNode } from 'react';
import { type LoggerType } from '@/main/lib/logger';

export namespace UseAuthGuard {
  export interface Model {
    isChecking: boolean;
  }

  export type Params = LoggerType;
}

export interface AuthGuardProps {
  children: ReactNode;
}
