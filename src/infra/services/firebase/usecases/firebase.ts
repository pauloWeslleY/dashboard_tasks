import { type CollectionsType, type IFirebase } from '@/infra/services/firebase';
import { type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { collection, getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

interface RemoteFirebaseDependencies {
  initApp: FirebaseApp;
}

export class RemoteFirebase implements IFirebase {
  private initApp: FirebaseApp;

  constructor(protected dependencies: RemoteFirebaseDependencies) {
    this.initApp = dependencies.initApp;
  }

  auth(): Auth {
    return getAuth(this.initApp);
  }

  storage(): FirebaseStorage {
    return getStorage(this.initApp);
  }

  getDB(): Firestore {
    return getFirestore(this.initApp);
  }

  collection(path: CollectionsType): IFirebase.CollectionParams {
    return collection(this.getDB(), path);
  }

  subCollection({ id, path, subCollection }: IFirebase.Params): IFirebase.CollectionParams {
    return collection(this.getDB(), path, id, subCollection);
  }
}
