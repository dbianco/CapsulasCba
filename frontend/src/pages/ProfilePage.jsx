import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1">{t('pages.profile')}</Typography>
    </Box>
  );
};

export default ProfilePage;
