import { type AccountModel } from '@/data/models/account.model';

export interface UseAccountInfoProps {
  userAuthenticated: AccountModel | null;
  isPendingUserUpdate: boolean;
}
