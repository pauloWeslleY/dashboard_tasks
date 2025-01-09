import { type UserModel } from '@/data/models/user.model';

export interface IUserInfoDTO {
  userId: string;
}

export interface IUserInfo {
  exec(userId: IUserInfoDTO): Promise<UserModel>;
}
