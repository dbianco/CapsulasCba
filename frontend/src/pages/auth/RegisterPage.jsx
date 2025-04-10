import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../../store/slices/authSlice';
import BasePage from '../../components/BasePage';

const RegisterPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ username, email, password }));
      navigate('/'); // Redirect to home page after successful registration
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration error (e.g., display an error message)
    }
  };

  return (
    <BasePage>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="register-username"
          aria-describedby="register-username-helper-text"
        />
        <FormHelperText id="register-username-helper-text">
          {t('register.usernameHelperText')}
        </FormHelperText>
        <TextField
          label={t('email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="register-email"
          aria-describedby="register-email-helper-text"
        />
        <FormHelperText id="register-email-helper-text">
          {t('register.emailHelperText')}
        </FormHelperText>
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ display: 'block', mb: 2 }}
          id="register-password"
          aria-describedby="register-password-helper-text"
        />
        <FormHelperText id="register-password-helper-text">
          {t('register.passwordHelperText')}
        </FormHelperText>
        <Button
          variant="contained"
          onClick={handleRegister}
          aria-label={t('register')}
          sx={{ mt: 2 }}
        >
          Registrarse
        </Button>
      </Box>
    </BasePage>
  );
};

export default RegisterPage;
