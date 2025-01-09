import { type ITaskServices } from '../types/task.services.type';
import { makeTaskRepositories } from './task.repositories.factory';
import { servicesTask } from './task.services';
import { TaskServicesFactory } from './task.services.factory';

function makeTaskServices(): ITaskServices {
  const taskRepositories = makeTaskRepositories();
  const taskServicesFactory = new TaskServicesFactory(taskRepositories);

  return servicesTask(taskServicesFactory);
}

export const taskServices: ITaskServices = makeTaskServices();
