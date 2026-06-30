import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import WaterIcon from '@mui/icons-material/Water';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useColorMode } from '../theme/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { toggleColorMode } = useColorMode();
  const theme = useMuiTheme();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully');
  };

  const avatarLetter = user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || '?';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: theme.zIndex.appBar,
        backdropFilter: 'blur(10px)',
        background:
          theme.palette.mode === 'light'
            ? 'linear-gradient(90deg, rgba(13,71,161,0.95) 0%, rgba(21,101,192,0.95) 50%, rgba(25,118,210,0.95) 100%)'
            : 'linear-gradient(90deg, rgba(5,13,31,0.95) 0%, rgba(10,22,40,0.95) 50%, rgba(13,27,62,0.95) 100%)',
        borderBottom:
          theme.palette.mode === 'light'
            ? '1px solid rgba(255,255,255,0.15)'
            : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Toolbar sx={{ gap: 0.5 }}>
        {/* Logo */}
        <WaterIcon sx={{ mr: 1, fontSize: 28, color: '#62ebff' }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 800,
            letterSpacing: 1.5,
            fontSize: '1.2rem',
          }}
        >
          OrchidsWorld
        </Typography>

        {/* Nav Links */}
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {[
            { to: '/', label: 'Home' },
            { to: '/natural', label: 'Natural' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Button
              key={to}
              component={Link}
              to={to}
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
                borderRadius: '20px',
                px: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  transform: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              {label}
            </Button>
          ))}

          {user ? (
            <>
              {user.isAdmin && (
                <Tooltip title="Admin Dashboard">
                  <Button
                    component={Link}
                    to="/dashboard"
                    startIcon={<DashboardIcon />}
                    sx={{
                      ml: 1,
                      bgcolor: 'rgba(0,184,212,0.2)',
                      color: '#62ebff',
                      border: '1px solid rgba(0,184,212,0.5)',
                      borderRadius: '20px',
                      '&:hover': {
                        bgcolor: 'rgba(0,184,212,0.35)',
                        boxShadow: '0 0 12px rgba(0,184,212,0.4)',
                        transform: 'none',
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                </Tooltip>
              )}

              <Tooltip
                title={`${user.displayName || user.email}${user.isAdmin ? ' · Admin' : ' · Member'} — Click to edit profile`}
              >
                <Avatar
                  component={Link}
                  to="/profile"
                  src={user.photoURL || undefined}
                  sx={{
                    ml: 1.5,
                    width: 36,
                    height: 36,
                    bgcolor: user.isAdmin ? '#f9a825' : '#1976d2',
                    fontSize: 14,
                    fontWeight: 800,
                    border: user.isAdmin ? '2px solid #ffd54f' : '2px solid #62ebff',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    boxShadow: user.isAdmin
                      ? '0 0 10px rgba(249,168,37,0.5)'
                      : '0 0 10px rgba(98,235,255,0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.12)',
                      boxShadow: user.isAdmin
                        ? '0 0 16px rgba(249,168,37,0.7)'
                        : '0 0 16px rgba(98,235,255,0.6)',
                    },
                  }}
                >
                  {avatarLetter}
                </Avatar>
              </Tooltip>

              <Button
                onClick={handleLogout}
                sx={{
                  ml: 0.5,
                  color: 'rgba(255,255,255,0.75)',
                  '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'none', boxShadow: 'none' },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                ml: 1,
                bgcolor: '#00b8d4',
                color: 'white',
                fontWeight: 700,
                borderRadius: '20px',
                px: 3,
                '&:hover': {
                  bgcolor: '#00e5ff',
                  boxShadow: '0 4px 15px rgba(0,184,212,0.5)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Login
            </Button>
          )}

          <IconButton sx={{ ml: 1, color: 'rgba(255,255,255,0.8)' }} onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
