'use server';

import { cookies } from 'next/headers';
import { logger } from '@/main/lib/default-logger';

import { type AccountModel } from '@/data/models/account.model';

export async function savedUserCookies(data: AccountModel): Promise<void> {
  logger.debug('User saved =>', data);
  cookies().set('uid', data.id);
  cookies().set('email', data.email);
  cookies().set('name', data.username);
  cookies().set('token', data.accessToken);
}

export async function getUserCookies(): Promise<AccountModel> {
  const id = cookies().get('uid')?.value;
  const email = cookies().get('email')?.value;
  const username = cookies().get('name')?.value;
  const accessToken = cookies().get('token')?.value;

  if (!id || !email || !username || !accessToken) {
    throw new Error('Error ao encontrar o usuário!');
  }

  return {
    id,
    email,
    username,
    accessToken,
  };
}

export async function deleteUserCookies(): Promise<void> {
  cookies().delete('uid');
  cookies().delete('name');
  cookies().delete('email');
  cookies().delete('token');
}
