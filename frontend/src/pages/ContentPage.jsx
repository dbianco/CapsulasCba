import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContentPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1">{t('pages.content')}</Typography>
    </Box>
  );
};

export default ContentPage;
