import { taskRepository } from '@/main/factories/repositories/task-repository.factory';

export async function GET() {
  const tasksList = await taskRepository.findAll();
  return Response.json(tasksList);
}
