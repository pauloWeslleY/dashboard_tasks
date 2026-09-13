'use client';

import { type AccountModel } from '@/data/models/account.model';

interface ISignInWithOAuthParams {
  provider: 'google' | 'discord';
}

interface IResetPasswordParams {
  email: string;
}

const userStorageKey = '@USER_LOGGED';

class AuthClient {
  async signUp(data: object): Promise<void> {
    localStorage.setItem(userStorageKey, JSON.stringify(data));
  }

  async signInWithOAuth(
    _: ISignInWithOAuthParams
  ): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(data: object): Promise<void> {
    localStorage.setItem(userStorageKey, JSON.stringify(data));
  }

  async resetPassword(
    _: IResetPasswordParams
  ): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(
    _: IResetPasswordParams
  ): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUserLogged(): Promise<AccountModel | null> {
    const userAccount = localStorage.getItem(userStorageKey);

    if (!userAccount) return null;

    return JSON.parse(userAccount) as AccountModel;
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(userStorageKey);
  }
}

export const authClient = new AuthClient();
