import React from 'react';
import { Box, Typography, Container, Grid, IconButton, useTheme } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        background: isDark
          ? 'linear-gradient(180deg, #0a0f1e 0%, #050d1f 100%)'
          : 'linear-gradient(180deg, #0d47a1 0%, #0a3880 100%)',
        color: 'white',
        pt: 5,
        pb: 3,
        mt: 'auto',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <WaterIcon sx={{ color: '#62ebff', fontSize: 26 }} />
              <Typography variant="h6" fontWeight={800} sx={{ color: 'white', letterSpacing: 1 }}>
                OrchidsWorld
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Curating the world's most exquisite orchid collection. Built with React & MUI for FER202.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#62ebff', mb: 1.5, textTransform: 'uppercase', letterSpacing: 1 }}>
              Pages
            </Typography>
            {[
              { to: '/', label: 'Home' },
              { to: '/natural', label: 'Natural' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Typography
                key={to}
                component={Link}
                to={to}
                variant="body2"
                display="block"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  mb: 0.5,
                  '&:hover': { color: '#62ebff' },
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Typography>
            ))}
          </Grid>

          {/* Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#62ebff', mb: 1.5, textTransform: 'uppercase', letterSpacing: 1 }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[GitHubIcon, LinkedInIcon, EmailIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    '&:hover': { bgcolor: 'rgba(98,235,255,0.2)', color: '#62ebff' },
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box
          sx={{
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} OrchidsWorld. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Made with React & Material UI · FER202
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
