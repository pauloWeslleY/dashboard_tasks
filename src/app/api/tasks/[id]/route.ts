import { taskServices } from '@/main/factories/repositories/task-repository.factory';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  const task = await taskServices.findById(params.id);
  return Response.json(task);
}
