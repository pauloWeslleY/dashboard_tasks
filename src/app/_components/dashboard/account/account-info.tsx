'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CloudArrowUp as CloudArrowUpIcon } from '@phosphor-icons/react/dist/ssr';

import { useAccountInfo, useUploadPhotoUser } from './hooks';
import * as S from './visually-hidden-input';

export function AccountInfo(): React.JSX.Element {
  const { userAuthenticated } = useAccountInfo();
  const { prevFile, handlerInputChangeFile } = useUploadPhotoUser();

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={prevFile} sx={{ height: '80px', width: '80px' }} />
          </div>

          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{userAuthenticated?.username}</Typography>

            <Typography color="text.secondary" variant="body2">
              {userAuthenticated?.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          component="label"
          role={undefined}
          variant="text"
          fullWidth
          tabIndex={-1}
          startIcon={<CloudArrowUpIcon />}
        >
          Upload files
          <S.VisuallyHiddenInput type="file" onChange={handlerInputChangeFile} multiple />
        </Button>
      </CardActions>
    </Card>
  );
}
