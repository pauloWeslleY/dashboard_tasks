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

import {
  ModalDeleteAllTask,
  TableTaskActions,
  TableTaskRows,
} from './components';
import { useTaskTable } from './hooks/use-task-table';
import { CustomNoRowsOverlay } from './not-rows';

export function TasksTable() {
  const {
    page,
    rowsPerPage,
    getTasks,
    isLoadingTasks,
    tasks,
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
      <Collapse in={selectedAll}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ justifyContent: 'end', margin: 1.5 }}
        >
          <ModalDeleteAllTask taskIds={selected} />

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

      <Collapse in={isLoadingTasks}>
        <Box sx={{ overflowX: 'auto', padding: 5 }}>
          <Stack
            component={Paper}
            direction="row"
            spacing={2}
            sx={{
              mx: 'auto',
              width: 'fit-content',
              alignItems: 'center',
              paddingX: 1.5,
              paddingY: 1,
              borderRadius: 2,
              background: (theme) => theme.palette.neutral[200],
            }}
          >
            <CircularProgress
              size={30}
              sx={{ color: 'primary.light' }}
            />
            <Typography variant="h4" color="primary.light">
              Carregando tarefas...
            </Typography>
          </Stack>
        </Box>
      </Collapse>

      {!isLoadingTasks && (
        <>
          <Box sx={{ overflowX: 'auto' }}>
            {tasks.length === 0 && (
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

            {tasks.length > 0 && (
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
                        <TableCell
                          key={props}
                          sx={{ textAlign: 'center' }}
                        >
                          {props}
                        </TableCell>
                      );
                    })}

                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tasks.map((task) => {
                    const isSelected = selected?.has(task.id);

                    return (
                      <TableRow
                        hover
                        key={task.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              handlerSelectRowTaskTable({
                                event,
                                rowId: task.id,
                              });
                            }}
                          />
                        </TableCell>

                        <TableTaskRows tasks={task} />

                        <TableTaskActions
                          taskId={task.id}
                          taskStatus={task.status}
                          isSelected={isSelected}
                        />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Box>

          {tasks.length > 0 && (
            <>
              <Divider />

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" color="primary.light">
                    Tarefas selecionadas: {selected.size}
                  </Typography>
                </Box>

                <TablePagination
                  component="div"
                  count={getTasks.length}
                  onPageChange={handlerPageChange}
                  onRowsPerPageChange={handlerRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage="Linhas por Paginas"
                  labelDisplayedRows={defaultLabelDisplayedRows}
                />
              </Stack>
            </>
          )}
        </>
      )}
    </Card>
  );
}
