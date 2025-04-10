import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BasePage from '../components/BasePage';

const ContentPage = () => {
  const { t } = useTranslation();

  return (
    <BasePage>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {t('pages.content')}
        </Typography>
      </Box>
    </BasePage>
  );
};

export default ContentPage;
