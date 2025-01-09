import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1, { message: 'Informe o e-mail' }).email({ message: 'Informe um e-mail válido' }),
  password: z.string().min(6, { message: 'Informe sua senha' }),
});
