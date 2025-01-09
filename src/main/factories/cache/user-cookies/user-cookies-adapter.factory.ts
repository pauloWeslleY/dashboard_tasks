'use server';

import { userCookiesAdapter, type UserCookiesAdapterType } from '@/infra/cache/cookies/user-cookies-adapter';

function makeUserCookiesAdapter(): UserCookiesAdapterType {
  return userCookiesAdapter;
}

export const userCookiesAdapterFactory = makeUserCookiesAdapter();
