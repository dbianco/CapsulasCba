import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../store/slices/authSlice';
import BasePage from '../../components/BasePage';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password }));
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <TextField
        id="username"
        label={t('username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ display: 'block', mb: 2 }}
        aria-describedby="username-helper-text"
      />
      <FormHelperText id="username-helper-text">{t('usernameHelperText')}</FormHelperText>
      <TextField
        id="password"
        label={t('password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ display: 'block', mb: 2 }}
        aria-describedby="password-helper-text"
      />
      <FormHelperText id="password-helper-text">{t('passwordHelperText')}</FormHelperText>
      <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }} aria-label={t('login.loginButton')}>
        {t('login.loginButton')}
      </Button>
    </Box>
  );
};

export default LoginPage;
