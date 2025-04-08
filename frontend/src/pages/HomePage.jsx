import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleExplore = () => {
    navigate('/explore');
  };

  const handleCreateContent = () => {
    navigate('/content/create');
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h3"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Bienvenido a CapsulasCba
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Plataforma de microaprendizaje colaborativo para estudiantes
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleExplore}
              sx={{ mr: 2 }}
            >
              Explorar Contenido
            </Button>
            {isAuthenticated && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleCreateContent}
              >
                Crear Contenido
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
                  Aprende
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Accede a contenido educativo creado por estudiantes para estudiantes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Colabora
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Trabaja con otros estudiantes en grupos de estudio y proyectos colaborativos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Comparte
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Crea y comparte tu propio contenido educativo con la comunidad.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        {!isAuthenticated && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              ¿Listo para empezar?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Regístrate Ahora
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
