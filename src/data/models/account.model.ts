import { type auth } from '@/infra/auth';

export interface AccountModel {
  id: string;
  username: string;
  email: string;
  accessToken: string;
}

export type SessionType = typeof auth.$Infer.Session;
