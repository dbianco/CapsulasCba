import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1">{t('pages.forgotPassword')}</Typography>
    </Box>
  );
};

export default ForgotPasswordPage;
