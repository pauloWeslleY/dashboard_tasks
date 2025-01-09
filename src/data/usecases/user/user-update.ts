import { type UserModel } from '@/data/models/user.model';

export interface IUserUpdateDTO {
  username: string;
  phone: string;
  avatar: File | null;
  dateOfBirth: string;
  address: {
    city: string;
    state: string;
  };
}

export interface IUserUpdate {
  execute(params: IUserUpdateDTO): Promise<UserModel>;
}
