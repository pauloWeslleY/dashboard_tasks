import { type Timestamp } from 'firebase/firestore';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date | Timestamp;
}

export interface IUserProfile extends IUser {
  phone: string | null;
  photoURL: string | null;
  dateOfBirth: string | null;
  address: {
    city: string;
    state: string;
  } | null;
  updateAt: Date | Timestamp | null;
}
