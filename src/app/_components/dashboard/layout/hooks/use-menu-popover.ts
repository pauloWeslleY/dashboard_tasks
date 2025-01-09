import { useRouter } from 'next/navigation';
import { loadAuthSignOut, useStateAuth } from '@/main/store/ducks/authentication';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseMenuPopoverProps } from '../types';

export function useMenuPopover(): UseMenuPopoverProps {
  const { data: loadUser } = useAppSelector(useStateAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handlerSignOut(): void {
    dispatch(loadAuthSignOut());
    router.refresh();
  }

  return {
    loadUser,
    handlerSignOut,
  };
}
