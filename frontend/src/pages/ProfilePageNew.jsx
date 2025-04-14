import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Alert,
  Snackbar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import BasePage from '../components/BasePage';
import { updateUserProfile } from '../store/slices/authSlice';

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    profilePicture: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if we have user data in localStorage as a fallback
    const storedUser = localStorage.getItem('user');

    if (user && user.data) {
      const userData = {
        firstName: user.data.firstName || '',
        lastName: user.data.lastName || '',
        email: user.data.email || '',
        bio: user.data.bio || '',
        profilePicture: null
      };
      setFormData(userData);
      
      // Store user data in localStorage as a backup
      localStorage.setItem('user', JSON.stringify(user.data));
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userData = {
          firstName: parsedUser.firstName || '',
          lastName: parsedUser.lastName || '',
          email: parsedUser.email || '',
          bio: parsedUser.bio || '',
          profilePicture: null
        };
        setFormData(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, [user, isAuthenticated]);

  if (isLoading || (!user && !localStorage.getItem('user'))) {
    return (
      <BasePage>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography>Loading...</Typography>
        </Box>
      </BasePage>
    );
  }

  if (!isAuthenticated) {
    return (
      <BasePage>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography color="error">{t('profile.userNotFound')}</Typography>
        </Box>
      </BasePage>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.required');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setSnackbar({
          open: true,
          message: t('profile.fileSizeError'),
          severity: 'error'
        });
        return;
      }
      setFormData(prev => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await dispatch(updateUserProfile(formDataToSend)).unwrap();
      setSnackbar({
        open: true,
        message: t('profile.updateSuccess'),
        severity: 'error'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || t('profile.updateError'),
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
          {t('pages.profile')}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-picture-input">
              <Avatar
                src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : user?.profilePictureUrl}
                alt={user?.firstName}
                sx={{ 
                  width: 150, 
                  height: 150, 
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              />
            </label>
            <Typography variant="h5" sx={{ mb: 0.5 }}>{`${user?.data?.firstName || ''} ${user?.data?.lastName || ''}`}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              @{user?.data?.username}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
              {user?.data?.email ? user.data.email : t('profile.noEmail')}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {t('profile.clickToChange')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {t('profile.firstName')} *
                  </Typography>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper'
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {t('profile.lastName')} *
                  </Typography>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper'
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {t('profile.email')} *
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper'
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {t('profile.bio')}
                  </Typography>
                  <TextField
                    fullWidth
                    name="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper'
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {t('profile.saveChanges')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </BasePage>
  );
};

export default ProfilePage;
