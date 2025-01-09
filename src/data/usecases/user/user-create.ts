import { type UserCredential } from 'firebase/auth';

import { type AccountModel } from '@/data/models/account.model';

export interface IUserCreateDTO {
  credential: UserCredential | null;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IUserCreate {
  execute(params: IUserCreateDTO): Promise<AccountModel>;
}
