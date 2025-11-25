import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useThemeContext } from '../context/ThemeContext';
import {
  AppBar,
  Box,
  Drawer,
  Button,
  List,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { mainListItems } from '../components/NavItems';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import Chatbot from '../components/Chatbot'; // Uncomment if you are using the chatbot

const drawerWidth = 240;

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useThemeContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Alzheimer's Disease Classifier
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Welcome, {user?.email || 'User'}
          </Typography>
          <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>{mainListItems}</List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      {/* <Chatbot /> */} {/* Uncomment if you are using the chatbot */}
    </Box>
  );
};

export default DashboardLayout;