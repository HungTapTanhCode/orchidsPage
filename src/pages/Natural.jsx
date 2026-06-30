import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Chip, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids } from '../features/orchidsSlice';
import OrchidCard from '../components/OrchidCard';
import { useNavigate } from 'react-router-dom';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

export default function Natural() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.orchids);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrchids());
  }, [status, dispatch]);

  const naturalOrchids = items.filter((orchid) => orchid.isNatural);

  return (
    <Box sx={{ bgcolor: isDark ? '#0a0f1e' : '#f0f4ff', minHeight: '80vh' }}>
      {/* Header */}
      <Box sx={{
        background: isDark
          ? 'linear-gradient(160deg,#050d1f 0%,#0a1628 100%)'
          : 'linear-gradient(160deg,#e8edf8 0%,#d0e4f7 100%)',
        borderBottom: isDark ? '1px solid rgba(98,235,255,0.08)' : '1px solid #b3cef0',
        py: { xs: 6, md: 9 }, mb: 6, textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%',
          background: isDark ? 'rgba(21,101,192,0.1)' : 'rgba(21,101,192,0.06)', filter: 'blur(40px)' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="🌿 Wild Species"
            sx={{ mb: 2.5, bgcolor: isDark ? 'rgba(76,175,80,0.15)' : '#e8f5e9',
              color: isDark ? '#a5d6a7' : '#2e7d32', fontWeight: 700, border: '1px solid', borderColor: isDark ? 'rgba(165,214,167,0.3)' : '#c8e6c9' }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: isDark ? '#e8eaf6' : '#0d1b3e' }}>
            Natural Orchids
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            A pure collection of wild and naturally occurring species — untouched by hybridization.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip icon={<NaturePeopleIcon />} label={`${naturalOrchids.length} Natural Species`} color="primary" variant="outlined" />
          </Box>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, lg: 10, xl: 14 }, pb: 10 }}>
        {status === 'loading' && (
          <Typography align="center" color="text.secondary">Loading natural orchids...</Typography>
        )}

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {naturalOrchids.map((orchid) => (
            <Grid item key={orchid.id} xs={12} sm={4} md={4} lg={4}>
              <OrchidCard orchid={orchid} onQuickView={() => navigate(`/detail/${orchid.id}`)} />
            </Grid>
          ))}
        </Grid>

        {naturalOrchids.length === 0 && status === 'succeeded' && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary" fontWeight={600}>No natural orchids found</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
