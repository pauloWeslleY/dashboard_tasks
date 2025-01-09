import { type UserModel } from '@/data/models/user.model';

export interface IUserList {
  exec(): Promise<UserModel[]>;
}
