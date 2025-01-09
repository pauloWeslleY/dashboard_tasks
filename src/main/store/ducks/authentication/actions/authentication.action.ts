import { createAction } from '@reduxjs/toolkit';

import { type IAuthenticationDTO } from '@/data/usecases';

export const loadAuthentication = createAction<IAuthenticationDTO>('auth/LOAD_AUTHENTICATION');

export const loadUserAuthenticated = createAction('auth/LOAD_USER_AUTHENTICATED');

export const loadAuthSignOut = createAction('auth/LOAD_AUTH_SIGN_OUT');
