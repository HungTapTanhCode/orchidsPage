import React, { useEffect, useState, useMemo } from 'react';
import {
  Container, Grid, Typography, Box, Dialog, Button, IconButton,
  useMediaQuery, useTheme, Rating, TextField, Chip, InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids } from '../features/orchidsSlice';
import OrchidCard from '../components/OrchidCard';
import { useNavigate } from 'react-router-dom';
import { FallingPetals } from './About/About';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.orchids);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrchids());
  }, [status, dispatch]);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((o) => o.category))].sort();
    return ['All', ...cats];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((orchid) => {
      const matchSearch = orchid.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchCat = selectedCategory === 'All' || orchid.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleQuickView = (orchid) => setSelectedOrchid(orchid);
  const handleClose = () => setSelectedOrchid(null);
  const handleNavigateToDetail = () => {
    const id = selectedOrchid.id;
    handleClose();
    setTimeout(() => navigate(`/detail/${id}`), 150);
  };

  return (
    <Box>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(160deg, #050d1f 0%, #0a1628 60%, #0d2044 100%)'
            : 'linear-gradient(160deg, #e8edf8 0%, #dce8f5 60%, #c5d9f5 100%)',
          borderBottom: isDark ? '1px solid rgba(98,235,255,0.08)' : '1px solid #b3cef0',
          py: { xs: 8, md: 12 },
          mb: 5,
          textAlign: 'center',
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: isDark ? 'rgba(21,101,192,0.12)' : 'rgba(21,101,192,0.07)', filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 320, height: 320, borderRadius: '50%', background: isDark ? 'rgba(0,184,212,0.08)' : 'rgba(0,184,212,0.06)', filter: 'blur(50px)' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Chip
            label="🌊 Explore the Collection"
            sx={{
              mb: 3,
              bgcolor: isDark ? 'rgba(21,101,192,0.25)' : 'rgba(21,101,192,0.1)',
              color: isDark ? '#90caf9' : '#1565c0',
              fontWeight: 700,
              border: '1px solid',
              borderColor: isDark ? 'rgba(144,202,249,0.3)' : 'rgba(21,101,192,0.25)',
            }}
          />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, color: isDark ? '#e8eaf6' : '#0d1b3e' }}>
            The Orchid Collection
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 400, lineHeight: 1.7 }}>
            Discover nature's most elegant creations. Our curated collection features rare and exotic orchids from around the world.
          </Typography>
        </Container>
      </Box>

      {/* ── Search & Filter ───────────────────────────────────────────────── */}
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, lg: 10, xl: 14 }, mb: 5 }}>
        <TextField
          fullWidth
          placeholder="Search orchids by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              bgcolor: isDark ? '#111827' : 'white',
              fontSize: '1rem',
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(21,101,192,0.08)',
              '& fieldset': { borderColor: isDark ? 'rgba(98,235,255,0.15)' : 'rgba(21,101,192,0.2)' },
              '&:hover fieldset': { borderColor: 'primary.main' },
            },
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <FilterListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              sx={{
                fontWeight: selectedCategory === cat ? 700 : 500,
                transition: 'all 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary">
          {status === 'loading' ? 'Loading...' : `Showing ${filteredItems.length} of ${items.length} orchids`}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </Typography>
      </Container>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <Container maxWidth={false} sx={{ mb: 10, px: { xs: 2, sm: 4, md: 8, lg: 10, xl: 14 } }}>
        {filteredItems.length === 0 && status !== 'loading' && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
              🔍 No orchids found
            </Typography>
            <Typography color="text.secondary" mb={3}>Try a different name or category.</Typography>
            <Button variant="outlined" color="primary" sx={{ borderRadius: '30px', px: 4 }}
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              Clear Filters
            </Button>
          </Box>
        )}

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {filteredItems.map((orchid) => (
            <Grid key={orchid.id} xs={12} sm={4} md={4} lg={4}>
              <OrchidCard orchid={orchid} onQuickView={handleQuickView} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Quick View Modal ──────────────────────────────────────────────── */}
      <Dialog
        fullScreen={fullScreen}
        open={Boolean(selectedOrchid)}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : '24px',
            bgcolor: isDark ? '#111827' : '#ffffff',
            boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.7)' : '0 20px 60px rgba(21,101,192,0.15)',
            m: fullScreen ? 0 : 2,
            border: isDark ? '1px solid rgba(98,235,255,0.1)' : 'none',
          },
        }}
      >
        {selectedOrchid && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: { md: '500px' } }}>
            {/* Image */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
              <Box component="img" src={selectedOrchid.image} alt={selectedOrchid.name}
                sx={{ width: '100%', height: '100%', minHeight: { xs: '320px', md: '500px' }, objectFit: 'cover', display: 'block' }} />
              <IconButton onClick={handleClose}
                sx={{ position: 'absolute', top: 14, left: 14, bgcolor: 'rgba(255,255,255,0.92)', color: '#000',
                  backdropFilter: 'blur(4px)', '&:hover': { bgcolor: '#fff' }, display: { xs: 'flex', md: 'none' } }}>
                <CloseIcon />
              </IconButton>
              {selectedOrchid.isSpecial && (
                <Box sx={{ position: 'absolute', top: 20, left: { xs: 'auto', md: 20 }, right: { xs: 14, md: 'auto' },
                  bgcolor: '#f9a825', color: '#000', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700 }}>
                  Special Edition
                </Box>
              )}
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, position: 'relative' }}>
              <IconButton onClick={handleClose}
                sx={{ position: 'absolute', top: 14, right: 14, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#f0f4ff',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.12)' : '#dce8f5' }, display: { xs: 'none', md: 'flex' } }}>
                <CloseIcon />
              </IconButton>

              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 1.5, mb: 0.5, display: 'block' }}>
                {selectedOrchid.category} Orchid
              </Typography>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                {selectedOrchid.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Rating value={selectedOrchid.rating} readOnly size="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {selectedOrchid.numberOfLike} enthusiasts love this
                </Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  { label: 'Origin', value: selectedOrchid.origin },
                  { label: 'Color', value: selectedOrchid.color },
                ].map(({ label, value }) => (
                  <Grid key={label} xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{label}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, textTransform: 'capitalize' }}>{value}</Typography>
                  </Grid>
                ))}
                <Grid xs={12}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: selectedOrchid.isNatural ? '#4caf50' : '#2196f3' }} />
                    {selectedOrchid.isNatural ? 'Pure Natural Species' : 'Cultivated Hybrid'}
                  </Typography>
                </Grid>
              </Grid>

              <Button onClick={handleNavigateToDetail} variant="contained" color="primary" size="large" fullWidth
                sx={{ py: 1.6, borderRadius: '14px', fontSize: '1rem', fontWeight: 700,
                  background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                  boxShadow: isDark ? 'none' : '0 8px 20px rgba(21,101,192,0.3)',
                  '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' } }}>
                View Full Details
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
