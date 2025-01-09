import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { type IUploadFile } from '@/infra/services/firebase-upload';
import { doc } from 'firebase/firestore';

import { type UserModel } from '@/data/models/user.model';
import { type IUserUpdate, type IUserUpdateDTO } from '@/data/usecases';

import { UserProfile } from '../entities/user-profile';
import { type IUserInfoRepository } from '../repositories/user-info.repository';
import { type IUserUpdateRepository } from '../repositories/user-update.repository';

interface IUserUpdateDependencies {
  database: IFirebase;
  upload: IUploadFile;
  userUpdateRepository: IUserUpdateRepository;
  userInfoRepository: IUserInfoRepository;
}

function convertStringToDate(createAt: string): Date {
  const [datePart, timePart] = createAt.split(' às ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}

export class UserUpdate implements IUserUpdate {
  private database: IFirebase;
  private upload: IUploadFile;
  private userUpdateRepository: IUserUpdateRepository;
  private userInfoRepository: IUserInfoRepository;
  private _avatarURL: string | null;

  constructor(protected readonly dependencies: IUserUpdateDependencies) {
    this.database = dependencies.database;
    this.upload = dependencies.upload;
    this.userUpdateRepository = dependencies.userUpdateRepository;
    this.userInfoRepository = dependencies.userInfoRepository;
    this._avatarURL = null;
  }

  async execute({ avatar, username, phone, address, dateOfBirth }: IUserUpdateDTO): Promise<UserModel> {
    const userAuth = this.database.auth().currentUser;

    if (!userAuth) {
      throw new Error('Usuário não encontrado!');
    }

    if (!userAuth.email || !userAuth.displayName) {
      throw new Error('Falha ao atualizar usuário');
    }

    if (avatar) {
      this._avatarURL = await this.upload.uploadFile({
        file: avatar,
        fileURL: username ? `user/${username}` : `user/${userAuth.displayName}`,
      });
    }

    const userInfoDoc = doc(this.database.getDB(), COLLECTION.users, userAuth.uid);
    const userCurrentInfo = await this.userInfoRepository.getUserInfo(userInfoDoc);

    const userUpdated = new UserProfile({
      ...userCurrentInfo,
      id: userAuth.uid,
      email: userAuth.email,
      username: username ?? userAuth.displayName,
      phone: phone || null,
      dateOfBirth: dateOfBirth || null,
      photoURL: this._avatarURL ?? userAuth.photoURL,
      createdAt: convertStringToDate(userCurrentInfo.createdAt),
      address,
    });

    console.log('userUpdated', userUpdated);

    userUpdated.UserUpdateAt = new Date();

    await this.userUpdateRepository.updated({
      user: userUpdated,
      credential: userAuth,
    });

    return {
      ...userCurrentInfo,
      username: userUpdated.username,
      phone: userUpdated.phone,
      address: userUpdated.address,
      photoURL: userUpdated.photoURL,
      dateOfBirth: userUpdated.dateOfBirth,
    };
  }
}
