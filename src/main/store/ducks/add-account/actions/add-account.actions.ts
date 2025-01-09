import { createAction } from '@reduxjs/toolkit';

import { type AddAccountType } from '../types/add-account.type';

export const loadAddAccount = createAction<AddAccountType>('addAccount/LOAD_ADD_ACCOUNT');
