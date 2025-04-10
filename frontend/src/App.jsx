import React, { useEffect } from 'react';
import i18n from './utils/i18n';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import ContentPage from './pages/ContentPage';
import ContentEditorPage from './pages/ContentEditorPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import CustomSnackbar from './components/common/CustomSnackbar';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <LoginPage />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
          } />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Main App Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/content/:id" element={<ContentPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/content/create" element={<ContentEditorPage />} />
            <Route path="/content/edit/:id" element={<ContentEditorPage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      
      <CustomSnackbar />
    </Box>
  );
};

export default App;
