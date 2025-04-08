import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Container,
  InputBase,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications,
  Add,
  Language,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { toggleMobileMenu, toggleSearchDrawer } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { collapsed: sidebarCollapsed } = useSelector((state) => state.ui.sidebar);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleCreateContent = () => {
    navigate('/content/create');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        width: { md: `calc(100% - ${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px)` },
        ml: { md: `${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px` },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('common.appName')}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('header.search')}
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title={t('common.language.toggle')}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
              sx={{ mr: 1 }}
            >
              <Language />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {t(`common.language.${i18n.language}`)}
              </Typography>
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={t('header.createContent')}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleCreateContent}
                >
                  <Add />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={t('header.notifications')}>
                <IconButton size="large" color="inherit">
                  <Notifications />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={t('header.profile')}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {user?.profilePictureUrl ? (
                    <Avatar
                      alt={user.firstName}
                      src={user.profilePictureUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  {t('header.myProfile')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{t('header.logout')}</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{ mr: 1 }}
              >
                {t('header.login')}
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                color="inherit"
              >
                {t('header.register')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
