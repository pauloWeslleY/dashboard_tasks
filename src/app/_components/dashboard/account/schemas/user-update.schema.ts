import { z } from 'zod';

export const UserUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  dateOfBirth: z.string(),
  phone: z.string(),
  address: z.object({
    state: z.string(),
    city: z.string(),
  }),
});
