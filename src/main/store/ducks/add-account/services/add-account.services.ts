import { RemoteAddAccount } from '@/domain/add-account';
import { DBFirebase } from '@/infra/services/firebase';
import { type UserCredential } from 'firebase/auth';

import { type IAddAccountDTO } from '@/data/usecases';

import { type AddAccountServiceType, type IAddAccountServices } from '../types/add-account.services.type';

const database = DBFirebase.database();

function makeAddAccountService(): AddAccountServiceType {
  const addAccount = new RemoteAddAccount({
    auth: DBFirebase.signUpAuth(database.auth()),
  });

  return {
    addAccount,
  };
}

export const addAccountServices: IAddAccountServices = {
  create: async (params: IAddAccountDTO): Promise<UserCredential> => {
    const { addAccount } = makeAddAccountService();
    return await addAccount.register(params);
  },
};
