import { type IAddAccountDTO, type IUserCreateDTO } from '@/data/usecases';

export type AddAccountType = Pick<IUserCreateDTO, 'username' | 'firstName' | 'lastName'> & IAddAccountDTO;
