import { type UserCredential } from 'firebase/auth';

import { type IAddAccount, type IAddAccountDTO } from '@/data/usecases';

export interface AddAccountServiceType {
  addAccount: IAddAccount;
}

export interface IAddAccountServices {
  create(params: IAddAccountDTO): Promise<UserCredential>;
}
