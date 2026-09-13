import { taskServices } from '@/main/factories/repositories/task-repository.factory';

export async function GET() {
  try {
    const tasksList = await taskServices.findAll();
    return Response.json(tasksList);
  } catch (error: any) {
    return Response.json(
      { error: error?.message || 'Erro ao buscar tarefas' },
      { status: 500 }
    );
  }
}
