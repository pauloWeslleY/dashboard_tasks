import { DayJsAdapter, type IDayJsAdapter } from '@/infra/adapters/dayjs';

function makeDateDayJsAdapter(): IDayJsAdapter {
  return new DayJsAdapter();
}

export const dateDayJsServices = makeDateDayJsAdapter();
