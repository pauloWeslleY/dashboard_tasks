import { db } from '@/infra/database/connection';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { schema } from '../database/schemas';

const FIVE_MINUTES = 5;
const ONE_HOUR = 60;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: schema.usersTable,
      sessions: schema.sessionsTable,
      accounts: schema.accountsTable,
      verifications: schema.verificationsTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'users',
    additionalFields: {
      firstName: {
        type: 'string',
        fieldName: 'firstName',
        required: false,
      },
      lastName: {
        type: 'string',
        fieldName: 'lastName',
        required: false,
      },
    },
  },
  session: {
    modelName: 'sessions',
    cookieCache: {
      enabled: true,
      maxAge: FIVE_MINUTES * ONE_HOUR,
    },
  },
  account: {
    modelName: 'accounts',
  },
  verification: {
    modelName: 'verifications',
  },
});
