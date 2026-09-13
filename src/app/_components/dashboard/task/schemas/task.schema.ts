import { z } from 'zod';

export const TaskSchema = z.object({
  name: z.string().min(1, { message: 'Informe o nome da tarefa' }),
  description: z
    .string()
    .min(1, { message: 'Informe a descrição da tarefa' }),
  category: z
    .string({
      invalid_type_error: 'Categoria inválida!',
      required_error: 'Dados Inválidos',
    })
    .min(1, { message: 'Informe a categoria da tarefa' }),
});
