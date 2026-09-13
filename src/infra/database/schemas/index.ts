import * as AccountsTable from './accounts.table';
import * as SessionsTable from './sessions.table';
import * as TasksTable from './tasks.table';
import * as UsersTable from './users.table';
import * as VerificationsTable from './verifications.table';

export const schema = {
  ...TasksTable,
  ...UsersTable,
  ...AccountsTable,
  ...SessionsTable,
  ...VerificationsTable,
};
