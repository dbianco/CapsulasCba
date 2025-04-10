import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BasePage from '../../components/BasePage';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Handle reset password logic here
    console.log('Reset password submitted');
  };

  return (
    <BasePage>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('newPassword')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="reset-password"
          aria-describedby="reset-password-helper-text"
        />
        <FormHelperText id="reset-password-helper-text">
          {t('resetPassword.passwordHelperText')}
        </FormHelperText>
        <TextField
          label={t('confirmPassword')}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="reset-confirm-password"
          aria-describedby="reset-confirm-password-helper-text"
        />
        <FormHelperText id="reset-confirm-password-helper-text">
          {t('resetPassword.confirmPasswordHelperText')}
        </FormHelperText>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }} aria-label={t('resetPassword.submit')}>
          {t('resetPassword.submit')}
        </Button>
      </Box>
    </BasePage>
  );
};

export default ResetPasswordPage;
