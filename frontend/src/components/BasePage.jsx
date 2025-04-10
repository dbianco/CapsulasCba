import React from 'react';
import { Container } from '@mui/material';

const BasePage = ({ children }) => {
  return (
    <Container maxWidth="lg">
      {children}
    </Container>
  );
};

export default BasePage;
