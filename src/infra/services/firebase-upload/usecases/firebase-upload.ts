import { FirebaseError } from 'firebase/app';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { AppError } from '@/data/errors/usecases/app-error';

import { type IFirebase } from '../../firebase/interfaces/firebase.interface';
import { type IUploadFile } from '../interfaces/firebase-upload.interface';

interface IFirebaseUploadDependencies {
  database: IFirebase;
}

export class FirebaseUpload implements IUploadFile {
  private database: IFirebase;
  private uploadURL: string;

  constructor(protected dependencies: IFirebaseUploadDependencies) {
    this.database = dependencies.database;
    this.uploadURL = '';
  }

  async uploadFile({ file, fileURL }: IUploadFile.DTO): Promise<IUploadFile.Model> {
    try {
      const uploadRef = ref(this.database.storage(), fileURL);
      const upload = await uploadBytes(uploadRef, file);
      this.uploadURL = await getDownloadURL(upload.ref);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    return this.uploadURL;
  }
}
