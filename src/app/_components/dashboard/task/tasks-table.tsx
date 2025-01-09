'use client';

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ModalDeleteAllTask, TableTaskActions, TableTaskRows } from './components';
import { useTaskTable } from './hooks/use-task-table';
import { CustomNoRowsOverlay } from './not-rows';

export function TasksTable(): React.JSX.Element {
  const {
    page,
    rowsPerPage,
    loadTaskList,
    isLoadingTasks,
    isPendingTasks,
    paginatedTasks,
    selected,
    selectedSome,
    selectedAll,
    loadTaskTableHeader,
    defaultLabelDisplayedRows,
    handlerPageChange,
    handlerRowsPerPageChange,
    handlerToggleAllTask,
    handlerSelectRowTaskTable,
    handlerSelectAllRowTaskTable,
  } = useTaskTable();

  return (
    <Card>
      <Backdrop
        open={isLoadingTasks || isPendingTasks}
        sx={(theme) => ({
          color: theme.palette.common.white,
          zIndex: theme.zIndex.drawer + 2,
          backdropFilter: 'blur(3px)',
        })}
      >
        <Stack
          component={Paper}
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            paddingX: 1.5,
            paddingY: 1,
            borderRadius: 2,
            background: (theme) => theme.palette.neutral[800],
          }}
        >
          <CircularProgress size={65} sx={{ color: 'primary.light' }} />
          <Typography variant="h3" color="primary.light">
            Loading...
          </Typography>
        </Stack>
      </Backdrop>

      <Collapse in={selectedAll}>
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'end', margin: 1.5 }}>
          <ModalDeleteAllTask />
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handlerToggleAllTask(true);
            }}
          >
            Marcar todas
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => {
              handlerToggleAllTask(false);
            }}
          >
            Desmarcar todas
          </Button>
        </Stack>
      </Collapse>

      <Box sx={{ overflowX: 'auto' }}>
        {paginatedTasks.length === 0 && (
          <Stack
            direction="column"
            sx={{
              width: '100%',
              height: 250,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 1.5,
            }}
          >
            <CustomNoRowsOverlay />
          </Stack>
        )}

        {paginatedTasks.length > 0 && (
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={handlerSelectAllRowTaskTable}
                  />
                </TableCell>

                {loadTaskTableHeader.map((props) => {
                  return (
                    <TableCell key={props} sx={{ textAlign: 'center' }}>
                      {props}
                    </TableCell>
                  );
                })}

                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedTasks.map((task) => {
                const isSelected = selected?.has(task.id);

                return (
                  <TableRow hover key={task.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          handlerSelectRowTaskTable({ event, rowId: task.id });
                        }}
                      />
                    </TableCell>

                    <TableTaskRows tasks={task} />

                    <TableTaskActions taskId={task.id} taskStatus={task.status} isSelected={isSelected} />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>

      {paginatedTasks.length > 0 && (
        <React.Fragment>
          <Divider />

          <TablePagination
            component="div"
            count={loadTaskList.length}
            onPageChange={handlerPageChange}
            onRowsPerPageChange={handlerRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Linhas por Paginas"
            labelDisplayedRows={defaultLabelDisplayedRows}
          />
        </React.Fragment>
      )}
    </Card>
  );
}
