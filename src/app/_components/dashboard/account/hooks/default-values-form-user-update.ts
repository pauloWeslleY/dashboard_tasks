import { type FormUserUpdateType } from '../types';

export const defaultValueFormUserUpdate: FormUserUpdateType = {
  firstName: '',
  lastName: '',
  username: '',
  dateOfBirth: '',
  phone: '',
  address: {
    state: '',
    city: '',
  },
};
