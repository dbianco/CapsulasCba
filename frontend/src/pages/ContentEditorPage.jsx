import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContentEditorPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1">{t('pages.contentEditor')}</Typography>
    </Box>
  );
};

export default ContentEditorPage;
