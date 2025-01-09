import { createAction } from '@reduxjs/toolkit';

import { type IUserUpdateDTO } from '@/data/usecases';

import { USER_ACTIONS } from './user-actions';

export const UserActionsType = {
  LIST: createAction(USER_ACTIONS.list),
  UPDATE: createAction<IUserUpdateDTO>(USER_ACTIONS.update),
};
