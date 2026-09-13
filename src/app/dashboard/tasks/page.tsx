import React from 'react';
import { type Metadata } from 'next';
import {
  DialogCreateTaskForm,
  TasksFilters,
  TasksTable,
} from '@/app/_components/dashboard';
import { config } from '@/main/config';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Tarefas</Typography>
        </Stack>

        <div>
          <DialogCreateTaskForm />
        </div>
      </Stack>

      <TasksFilters />

      <TasksTable />
    </Stack>
  );
}
