import { type AccountModel } from '@/data/models/account.model';

export interface IAuthenticationDTO {
  email: string;
  password: string;
}

export interface IAuthentication {
  authentication(params: IAuthenticationDTO): Promise<AccountModel>;
}
