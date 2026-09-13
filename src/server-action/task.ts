'use server';

import { taskServices } from '@/main/factories/repositories/task-repository.factory';

import { TaskModel } from '@/data/models/task.model';

interface CreateTaskActionData {
  name: string;
  description: string;
  category: string;
  userId: string;
}

interface UpdateTaskActionData {
  name: string;
  description: string;
  category: string;
  id: string;
}

interface TaskActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const createTaskAction = async (
  data: CreateTaskActionData
): Promise<TaskActionResult<TaskModel>> => {
  try {
    const newTask = await taskServices.create(data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newTask)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Erro ao criar tarefa no servidor.',
    };
  }
};

export const updateTaskAction = async (
  data: UpdateTaskActionData
): Promise<TaskActionResult<TaskModel>> => {
  try {
    const updateTask = await taskServices.save(data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updateTask)),
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.message || 'Erro ao atualizar tarefa no servidor.',
    };
  }
};

export const updateTaskStatusAction = async (
  id: string,
  status: boolean
): Promise<TaskActionResult<TaskModel>> => {
  try {
    const updatedTask = await taskServices.status(id, status);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedTask)),
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.message ||
        'Erro ao atualizar status da tarefa no servidor.',
    };
  }
};

export const deleteTaskAction = async (
  id: string
): Promise<TaskActionResult<null>> => {
  try {
    await taskServices.delete(id);
    return {
      success: true,
      data: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Erro ao deletar tarefa no servidor.',
    };
  }
};
