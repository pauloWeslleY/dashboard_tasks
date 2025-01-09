import { type IUser } from './user.interface';

export class User implements IUser {
  public id: string;
  public email: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date = new Date();

  constructor(props: Pick<IUser, 'id' | 'email' | 'username' | 'firstName' | 'lastName'>) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }
}
