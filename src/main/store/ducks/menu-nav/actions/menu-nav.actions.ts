import { createAction } from '@reduxjs/toolkit';

const MenuNavActionType = {
  CREATE_MENU_NAV: 'CREATE_MENU_NAV',
  GET_MENU_NAV: 'GET_MENU_NAV',
} as const;

export const createMenuNavActionType = createAction<boolean>(
  MenuNavActionType.CREATE_MENU_NAV
);

export const getMenuNavActionType = createAction(
  MenuNavActionType.GET_MENU_NAV
);
