import { useState } from 'react';
import { usePopover } from '@/app/hooks/use-popover';
import { setMenuNav } from '@/main/store/ducks/menu-nav';
import {
  useAppDispatch,
  useAppSelector,
} from '@/main/store/hooks/use-redux';

import { type UseMainNavProps } from '../types';

export function useMainNav(): UseMainNavProps {
  const [mainNav, setMainNav] = useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();
  const menuNav = useAppSelector((state) => state.menuNav);
  const dispatch = useAppDispatch();

  function handlerCloseMainNav(): void {
    setMainNav(false);
  }

  function handlerOpenMainNav(): void {
    setMainNav(true);
  }

  function handlerToggleMenuNav(): void {
    dispatch(setMenuNav());
  }

  return {
    menuNav,
    mainNav,
    userPopover,
    handlerOpenMainNav,
    handlerCloseMainNav,
    handlerToggleMenuNav,
  };
}
