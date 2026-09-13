import { taskServices } from '@/main/factories/repositories/task-repository.factory';

export async function GET() {
  const tasksList = await taskServices.findAll();
  return Response.json(tasksList);
}
