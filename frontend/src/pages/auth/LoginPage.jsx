import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, FormHelperText, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../store/slices/authSlice';
import BasePage from '../../components/BasePage';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login with username:', username);
      const result = await dispatch(loginUser({ username, password }));
      if (result.payload && result.payload.data) {
        console.log('Login successful, user data:', result.payload.data);
        // Wait for the state to be updated before navigating
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/');
        setLoginError('');
      } else {
        console.error('Login failed - no payload:', result);
        setLoginError(t('login.loginFailed'));
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(t('login.loginFailed'));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <BasePage>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t('login.loginFailed')}
          </Alert>
        )}
        <TextField
          id="username"
          label={t('login.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ display: 'block', mb: 2 }}
          aria-describedby="username-helper-text"
        />
        <FormHelperText id="username-helper-text">{t('login.usernameHelperText')}</FormHelperText>
        <TextField
          id="password"
          label={t('login.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ display: 'block', mb: 2 }}
          aria-describedby="password-helper-text"
        />
        <FormHelperText id="password-helper-text">{t('login.passwordHelperText')}</FormHelperText>
        <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }} aria-label={t('login.loginButton')}>
          {t('login.loginButton')}
        </Button>
      </Box>
    </BasePage>
  );
};

export default LoginPage;
