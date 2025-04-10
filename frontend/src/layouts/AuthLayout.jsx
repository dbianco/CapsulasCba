import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
