import { type AccountModel } from '@/data/models/account.model';

export interface UseMenuPopoverProps {
  loadUser: AccountModel | null;
  handlerSignOut(): void;
}
