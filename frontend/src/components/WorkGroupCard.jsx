import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const WorkGroupCard = ({ workGroup, onEdit }) => {
  const { t } = useTranslation();
  return (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {workGroup.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {workGroup.description}
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="outlined" color="primary" onClick={() => onEdit(workGroup)}>
            {t('workgroups.viewEdit')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkGroupCard;
