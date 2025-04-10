import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import BasePage from '../components/BasePage';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
          <Header />
          <BasePage>
            <Outlet />
          </BasePage>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
