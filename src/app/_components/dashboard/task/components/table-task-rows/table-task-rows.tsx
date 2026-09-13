import React, { type ReactElement } from 'react';
import { Tag } from '@/app/_components/ui';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Checks as ChecksIcon } from '@phosphor-icons/react/dist/ssr/Checks';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';

import { useTableTaskRows } from './hooks';
import {
  STATUS_TASK,
  type StatusTaskType,
  type TableTaskRowsProps,
} from './types';

export function TableTaskRows({ tasks }: TableTaskRowsProps) {
  const { columnsTableTask } = useTableTaskRows({ task: tasks });

  const StatusTask: Record<StatusTaskType, ReactElement> = {
    [STATUS_TASK.DONE]: (
      <Tag label="Completada" iconLeft={ChecksIcon} color="success" />
    ),
    [STATUS_TASK.NOT_DONE]: (
      <Tag label="Pendente" iconLeft={TimerIcon} color="warning" />
    ),
  };

  return (
    <React.Fragment>
      {columnsTableTask.map((task) => {
        return (
          <TableCell key={task.title}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: (theme) =>
                  theme.typography.fontWeightMedium,
              }}
            >
              {task.content}
            </Typography>

            {typeof task.content === 'boolean' && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'center' }}
              >
                {
                  StatusTask[
                    task.content
                      ? STATUS_TASK.DONE
                      : STATUS_TASK.NOT_DONE
                  ]
                }
              </Stack>
            )}
          </TableCell>
        );
      })}
    </React.Fragment>
  );
}
