import { type Auth } from 'firebase/auth';
import { type CollectionReference, type Firestore } from 'firebase/firestore';
import { type FirebaseStorage } from 'firebase/storage';

import { type CollectionsType } from '../collections/collections';

export namespace IFirebase {
  export interface Params {
    id: string;
    path: CollectionsType;
    subCollection: CollectionsType;
  }

  export type CollectionParams = CollectionReference;
}

export interface IFirebase {
  auth(): Auth;
  getDB(): Firestore;
  storage(): FirebaseStorage;
  collection(params: CollectionsType): IFirebase.CollectionParams;
  subCollection(params: IFirebase.Params): IFirebase.CollectionParams;
}
