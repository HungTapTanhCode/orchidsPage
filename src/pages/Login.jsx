import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import WaterIcon from '@mui/icons-material/Water';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useTheme } from '@mui/material';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(loginSuccess({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      toast.success(`Welcome, ${user.displayName || user.email}!`);
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Login cancelled.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #050d1f 0%, #0a1628 50%, #0d1b3e 100%)'
          : 'linear-gradient(135deg, #e8edf8 0%, #dce8f5 50%, #cfe2f8 100%)',
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        {/* Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '28px',
            overflow: 'hidden',
            border: isDark ? '1px solid rgba(98,235,255,0.12)' : '1px solid rgba(21,101,192,0.15)',
            boxShadow: isDark
              ? '0 30px 80px rgba(0,0,0,0.5)'
              : '0 20px 60px rgba(21,101,192,0.15)',
            bgcolor: isDark ? '#111827' : '#ffffff',
          }}
        >
          {/* Top gradient strip */}
          <Box
            sx={{
              background: 'linear-gradient(90deg, #0d47a1 0%, #1565c0 50%, #00b8d4 100%)',
              py: 4,
              px: 4,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                backdropFilter: 'blur(8px)',
              }}
            >
              <WaterIcon sx={{ fontSize: 34, color: '#62ebff' }} />
            </Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: 'white', mb: 0.5 }}>
              Welcome to OrchidsWorld
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
              Sign in to access your account
            </Typography>
          </Box>

          {/* Body */}
          <Box sx={{ p: { xs: 4, sm: 5 } }}>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3, lineHeight: 1.7 }}>
              Use your Google account to sign in. Admin access is granted automatically based on your email.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                py: 1.6,
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1565c0, #1976d2)',
                boxShadow: '0 6px 20px rgba(21,101,192,0.35)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0d47a1, #1565c0)',
                  boxShadow: '0 10px 28px rgba(21,101,192,0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Paper>

        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 2.5, color: 'text.secondary' }}>
          © {new Date().getFullYear()} OrchidsWorld · SE172330 · FER202
        </Typography>
      </Box>
    </Box>
  );
}
