import { type UserCredential } from 'firebase/auth';

export interface IAddAccountDTO {
  email: string;
  password: string;
}

export interface IAddAccount {
  register(params: IAddAccountDTO): Promise<UserCredential>;
}
