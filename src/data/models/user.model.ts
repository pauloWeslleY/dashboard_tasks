import { type IUserProfile } from '@/domain/user/entities/user.interface';

export type UserModel = Omit<IUserProfile, 'createdAt' | 'updateAt'> & {
  createdAt: string;
  updateAt: string | null;
};
