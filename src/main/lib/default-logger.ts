import { config } from '@/main/config';
import { createLogger } from '@/main/lib/logger';

export const logger = createLogger({ level: config.logLevel });
