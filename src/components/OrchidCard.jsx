import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, CardActions,
  Button, Chip, Box, Rating, useTheme, IconButton, Tooltip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../features/orchidsSlice';

export default function OrchidCard({ orchid, onQuickView }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const likedBy  = Array.isArray(orchid.likedBy) ? orchid.likedBy : [];
  const isLiked  = user ? likedBy.includes(user.email) : false;
  const likeCount = orchid.numberOfLike ?? likedBy.length;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(toggleLike({ orchidId: orchid.id, userEmail: user.email }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, type: 'spring', bounce: 0.28 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          bgcolor: isDark ? '#111827' : '#ffffff',
          border: isDark
            ? '1px solid rgba(98,235,255,0.08)'
            : '1px solid rgba(21,101,192,0.1)',
          boxShadow: isDark
            ? '0 8px 24px rgba(0,0,0,0.35)'
            : '0 4px 20px rgba(21,101,192,0.07)',
          transition: 'all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: isDark
              ? '0 24px 50px rgba(0,0,0,0.7)'
              : '0 20px 50px rgba(21,101,192,0.2)',
            borderColor: isDark ? 'rgba(98,235,255,0.3)' : 'rgba(21,101,192,0.3)',
            '& .MuiCardMedia-root': { transform: 'scale(1.1)' },
            '& .quick-view-btn': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Special badge */}
        {orchid.isSpecial && (
          <Chip
            label="Special"
            size="small"
            sx={{
              position: 'absolute', top: 14, left: 14, zIndex: 10,
              fontWeight: 700, bgcolor: '#f9a825', color: '#000',
              boxShadow: '0 2px 8px rgba(249,168,37,0.5)', fontSize: '0.7rem',
            }}
          />
        )}

        {/* Like button (top-right) */}
        <Tooltip title={!user ? 'Login to like' : isLiked ? 'Unlike' : 'Like'} arrow>
          <IconButton
            onClick={handleLike}
            size="small"
            sx={{
              position: 'absolute', top: 10, right: 10, zIndex: 10,
              bgcolor: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(6px)',
              border: isLiked ? '1.5px solid rgba(239,83,80,0.4)' : '1.5px solid transparent',
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,1)',
                transform: 'scale(1.15)',
              },
            }}
          >
            {isLiked
              ? <FavoriteIcon sx={{ fontSize: 18, color: '#ef5350' }} />
              : <FavoriteBorderIcon sx={{ fontSize: 18, color: isDark ? '#90a4ae' : '#607d8b' }} />}
          </IconButton>
        </Tooltip>

        {/* Image */}
        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            image={orchid.image}
            alt={orchid.name}
            sx={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
          />
          {/* Hover overlay */}
          <Box
            className="quick-view-btn"
            onClick={() => onQuickView(orchid)}
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(13,71,161,0.75), rgba(0,184,212,0.6))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transform: 'translateY(15px)',
              transition: 'all 0.35s ease', cursor: 'pointer',
            }}
          >
            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              sx={{
                bgcolor: 'white', color: '#1565c0', fontWeight: 700,
                borderRadius: '30px', px: 3,
                '&:hover': { bgcolor: '#e3f2fd', transform: 'none' },
              }}
            >
              Quick View
            </Button>
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Chip
              label={orchid.category}
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(21,101,192,0.25)' : '#e3f2fd',
                color: isDark ? '#90caf9' : '#1565c0',
                fontWeight: 700, fontSize: '0.72rem',
              }}
            />

            {/* Like count with animation */}
            <Box
              onClick={handleLike}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.4,
                cursor: 'pointer',
                color: isLiked ? '#ef5350' : 'text.secondary',
                fontWeight: 700, fontSize: '0.85rem',
                transition: 'color 0.2s, transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' },
                userSelect: 'none',
              }}
            >
              {isLiked
                ? <FavoriteIcon sx={{ fontSize: 16 }} />
                : <FavoriteBorderIcon sx={{ fontSize: 16 }} />}
              <Typography variant="body2" fontWeight={700} color="inherit">
                {likeCount}
              </Typography>
            </Box>
          </Box>

          <Typography
            gutterBottom variant="h6" component="div"
            sx={{ fontWeight: 800, lineHeight: 1.25, mb: 1, fontSize: '1.05rem' }}
          >
            {orchid.name}
          </Typography>

          <Rating value={orchid.rating} readOnly size="small" sx={{ mb: 0.5 }} />
        </CardContent>

        {/* Action */}
        <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button
            fullWidth variant="contained" color="primary"
            component={Link} to={`/detail/${orchid.id}`}
            startIcon={<InfoIcon />}
            sx={{
              borderRadius: '14px', py: 1.1, fontWeight: 700,
              background: isDark
                ? 'linear-gradient(90deg,#0d47a1,#1565c0)'
                : 'linear-gradient(90deg,#1565c0,#1976d2)',
              '&:hover': {
                background: 'linear-gradient(90deg,#0a3880,#1565c0)',
                boxShadow: '0 6px 18px rgba(21,101,192,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
