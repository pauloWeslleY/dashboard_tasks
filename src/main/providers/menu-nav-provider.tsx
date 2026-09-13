'use client';

import React, { useEffect } from 'react';

import { getMenuNavActionType } from '../store/ducks/menu-nav/actions/menu-nav.actions';
import { useAppDispatch } from '../store/hooks/use-redux';

export function MenuNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMenuNavActionType());
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
}
