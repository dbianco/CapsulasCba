import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BasePage from '../../components/BasePage';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Handle forgot password logic here
    console.log('Forgot password submitted for email:', email);
  };

  return (
    <BasePage>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="forgot-password-email"
          aria-describedby="forgot-password-email-helper-text"
        />
        <FormHelperText id="forgot-password-email-helper-text">
          {t('forgotPassword.emailHelperText')}
        </FormHelperText>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }} aria-label={t('forgotPassword.submit')}>
          {t('forgotPassword.submit')}
        </Button>
      </Box>
    </BasePage>
  );
};

export default ForgotPasswordPage;
