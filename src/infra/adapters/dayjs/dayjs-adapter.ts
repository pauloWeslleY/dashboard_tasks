import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

interface IDayJsAdapterParams {
  date: Timestamp | Date | null;
  hours: boolean;
}

export interface IDayJsAdapter {
  formatDateAndHour(params: IDayJsAdapterParams): string;
  formatTimeStamp(date: Timestamp | Date | null): number;
}

export class DayJsAdapter implements IDayJsAdapter {
  formatDateAndHour({ date, hours }: IDayJsAdapterParams): string {
    if (date instanceof Timestamp) {
      const seconds = date.seconds;
      const nanoseconds = date.nanoseconds;
      const milliseconds = seconds * 1000 + nanoseconds / 1000000;
      const formatString = hours ? 'DD/MM/YYYY [ás] HH:mm' : 'DD/MM/YYYY';

      return dayjs(milliseconds).format(formatString);
    }

    if (date instanceof Date) {
      const formatString = hours ? 'DD/MM/YYYY [ás] HH:mm' : 'DD/MM/YYYY';
      return dayjs(date).format(formatString);
    }

    return 'Sem data';
  }

  formatTimeStamp(date: Timestamp | Date | null): number {
    if (!date) {
      throw new Error('Error a formatar');
    }

    if (date instanceof Timestamp) {
      const seconds = date.seconds;
      const nanoseconds = date.nanoseconds;
      return seconds * 1000 + nanoseconds / 1000000;
    }

    return 0;
  }
}
