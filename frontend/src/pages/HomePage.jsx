import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BasePage from '../components/BasePage';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleExplore = () => {
    navigate('/explore');
  };

  const handleCreateContent = () => {
    navigate('/content/create');
  };

  return (
    <BasePage>
      {/* Hero Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {t('home.welcome')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t('home.description')}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleExplore}
            sx={{ mr: 2 }}
            aria-label={t('home.exploreContent')}
          >
            {t('home.exploreContent')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/workgroups')}
            aria-label={t('workgroups.title')}
          >
            {t('workgroups.title')}
          </Button>
          {isAuthenticated && (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleCreateContent}
              aria-label={t('home.createContent')}
            >
              {t('home.createContent')}
            </Button>
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('home.learn')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.learnDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('home.collaborate')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.collaborateDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('home.share')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.shareDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      {!isAuthenticated && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('home.readyToStart')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
            aria-label={t('home.registerNow')}
          >
            {t('home.registerNow')}
          </Button>
        </Box>
      )}
    </BasePage>
  );
};

export default HomePage;
