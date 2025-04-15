import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Home,
  School,
  Group,
  Bookmark,
  TrendingUp,
  Settings,
  Help,
  ChevronLeft,
  ChevronRight,
  CollectionsBookmark,
} from '@mui/icons-material';
import { toggleMobileMenu, toggleSidebar } from '../../store/slices/uiSlice';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const getMenuItems = (t) => [
  { text: t('sidebar.menu.home'), icon: <Home />, path: '/' },
  { text: t('sidebar.menu.explore'), icon: <School />, path: '/explore' },
  { text: t('sidebar.menu.groups'), icon: <Group />, path: '/workgroups' },
  { text: t('sidebar.menu.saved'), icon: <Bookmark />, path: '/saved' },
  { text: t('sidebar.menu.trending'), icon: <TrendingUp />, path: '/trending' },
  { text: t('sidebar.menu.contentCapsules'), icon: <CollectionsBookmark />, path: '/content' },
];

const getBottomMenuItems = (t) => [
  { text: t('sidebar.bottomMenu.settings'), icon: <Settings />, path: '/settings' },
  { text: t('sidebar.bottomMenu.help'), icon: <Help />, path: '/help' },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { open: mobileOpen } = useSelector((state) => state.ui.mobileMenu);
  const { collapsed: sidebarCollapsed } = useSelector((state) => state.ui.sidebar);

  const handleDrawerToggle = () => {
    dispatch(toggleMobileMenu());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const menuItems = getMenuItems(t);
  const bottomMenuItems = getBottomMenuItems(t);

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Tooltip title={sidebarCollapsed ? t('sidebar.tooltip.expand') : t('sidebar.tooltip.collapse')}>
          <IconButton onClick={handleSidebarToggle}>
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
