import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(6, {
    message: 'Password should be at least 6 characters',
  }),
  terms: z
    .boolean()
    .refine(
      (value) => value,
      'You must accept the terms and conditions'
    ),
});
