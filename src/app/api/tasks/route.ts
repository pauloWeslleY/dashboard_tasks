import { NextRequest, NextResponse } from 'next/server';
import { taskServices } from '@/main/factories/repositories/task-repository.factory';

const TASK = {
  DONE: 'COMPLETED',
  NOT_DONE: 'NOT COMPLETED',
} as const;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const status = searchParams.get('status');
  const category = searchParams.get('category');

  const tasksList = await taskServices.find({
    query: q ?? undefined,
    status: status ? status === TASK.DONE : undefined,
    category: category ?? undefined,
  });

  return NextResponse.json(tasksList);
}
