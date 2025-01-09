import { type Timestamp } from 'firebase/firestore';

import { type IUserProfile } from './user.interface';

export class UserProfile implements IUserProfile {
  public id: string;
  public email: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public phone: string | null;
  public photoURL: string | null;
  public dateOfBirth: string | null;
  public address: {
    city: string;
    state: string;
  } | null;
  public createdAt: Date = new Date();
  public updateAt: Date | Timestamp | null = null;

  constructor(props: Omit<IUserProfile, 'updateAt'>) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phone = props.phone;
    this.photoURL = props.photoURL;
    this.dateOfBirth = props.dateOfBirth;
    this.address = props.address;
    this.createdAt = props.createdAt instanceof Date ? props.createdAt : new Date();
  }

  get UserUpdateAt(): Date | Timestamp | null {
    return this.updateAt;
  }

  set UserUpdateAt(value: Date | Timestamp | null) {
    this.updateAt = value;
  }
}
