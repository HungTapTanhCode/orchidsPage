import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids, submitFeedback, deleteFeedback } from '../features/orchidsSlice';
import {
  Box, Typography, Button, CircularProgress, Container, CardMedia, Chip,
  Rating, Grid, Paper, useTheme, Avatar, TextField, Divider, Alert, IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WaterIcon from '@mui/icons-material/Water';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginIcon from '@mui/icons-material/Login';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const feedbackSchema = Yup.object({
  rating: Yup.number().min(1, 'Please select a rating').required('Required'),
  comment: Yup.string().min(5, 'At least 5 characters').required('Required'),
});

function FeedbackCard({ fb, isOwner, onEdit, onDelete, theme }) {
  const isDark = theme.palette.mode === 'dark';
  return (
    <Paper elevation={0} sx={{
      p: 3, mb: 2, borderRadius: '16px',
      border: `1px solid ${isDark ? (isOwner ? 'rgba(21,101,192,0.3)' : 'rgba(255,255,255,0.06)') : (isOwner ? 'rgba(21,101,192,0.25)' : '#e3eaf5')}`,
      bgcolor: isOwner ? (isDark ? 'rgba(21,101,192,0.1)' : '#f0f4ff') : (isDark ? '#111827' : '#ffffff'),
      position: 'relative',
    }}>
      {isOwner && (
        <Chip label="Your review" size="small" color="primary"
          sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700, fontSize: '0.68rem' }} />
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Avatar sx={{ width: 38, height: 38, bgcolor: isOwner ? 'primary.main' : 'grey.600', fontSize: 15, fontWeight: 700 }}>
          {fb.author?.[0]?.toUpperCase() || '?'}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={700} noWrap sx={{ maxWidth: 220 }}>{fb.author}</Typography>
          <Typography variant="caption" color="text.secondary">
            {fb.date ? new Date(fb.date).toLocaleDateString('vi-VN') : ''}
          </Typography>
        </Box>
        <Rating value={fb.rating} readOnly size="small" />
      </Box>
      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{fb.comment}</Typography>
      {isOwner && (
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button size="small" startIcon={<EditIcon />} onClick={onEdit} variant="outlined" color="primary" sx={{ borderRadius: 6 }}>Edit</Button>
          <Button size="small" startIcon={<DeleteIcon />} onClick={onDelete} variant="outlined" color="error" sx={{ borderRadius: 6 }}>Delete</Button>
        </Box>
      )}
    </Paper>
  );
}

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { items, status, feedbackSubmitting } = useSelector((state) => state.orchids);
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status === 'idle') dispatch(fetchOrchids());
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const orchid = items.find((item) => String(item.id) === String(id));

  if (!orchid) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, minHeight: '50vh' }}>
        <WaterIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h4" color="text.secondary" fontWeight="bold" sx={{ mb: 4 }}>Orchid not found</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} size="large">Go Back</Button>
      </Box>
    );
  }

  const feedbackList = Array.isArray(orchid.feedback) ? orchid.feedback : [];
  const myFeedback = user ? feedbackList.find((f) => f.author === user.email) : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rating: isEditing && myFeedback ? myFeedback.rating : 0,
      comment: isEditing && myFeedback ? myFeedback.comment : '',
    },
    validationSchema: feedbackSchema,
    onSubmit: async (values, { resetForm }) => {
      if (feedbackSubmitting) return;
      await dispatch(submitFeedback({
        orchidId: orchid.id,
        feedbackEntry: { rating: values.rating, comment: values.comment.trim(), author: user.email, date: new Date().toISOString() },
      }));
      toast.success(isEditing ? 'Feedback updated!' : 'Feedback submitted!');
      setIsEditing(false);
      resetForm();
    },
  });

  return (
    <Box sx={{ bgcolor: isDark ? '#0a0f1e' : '#f0f4ff', minHeight: '80vh', pt: 2, pb: 8 }}>
      <Container maxWidth="lg">
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main', transform: 'none', boxShadow: 'none' } }}>
          Go Back
        </Button>

        {/* ── Detail Card ─────────────────────────────────────────────────── */}
        <Paper elevation={0} sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' },
          borderRadius: '24px', overflow: 'hidden',
          border: isDark ? '1px solid rgba(98,235,255,0.1)' : '1px solid #c5d9f5',
          bgcolor: isDark ? '#111827' : '#ffffff',
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 10px 40px rgba(21,101,192,0.1)',
        }}>
          <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
            <CardMedia component="img" image={orchid.image} alt={orchid.name}
              sx={{ width: '100%', height: '100%', minHeight: { xs: '320px', md: '500px' }, objectFit: 'cover' }} />
            {orchid.isSpecial && (
              <Chip label="Special Edition" sx={{ position: 'absolute', top: 20, left: 20, fontWeight: 700, bgcolor: '#f9a825', color: '#000', px: 1 }} />
            )}
          </Box>

          <Box sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
            <Box sx={{ mb: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={orchid.category} color="primary" variant="outlined" />
              {orchid.isNatural
                ? <Chip label="Natural Species" color="success" />
                : <Chip label="Hybrid" sx={{ bgcolor: isDark ? 'rgba(21,101,192,0.2)' : '#e3f2fd', color: isDark ? '#90caf9' : '#1565c0' }} />}
            </Box>

            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
              {orchid.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, p: 2.5,
              bgcolor: isDark ? 'rgba(21,101,192,0.1)' : '#e8f0fe', borderRadius: '16px' }}>
              <Rating value={orchid.rating} readOnly size="large" />
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontWeight: 600 }}>
                <FavoriteIcon sx={{ color: 'error.main', mr: 0.5, fontSize: 22 }} />{orchid.numberOfLike} Likes
              </Typography>
              <Typography variant="body2" color="text.secondary">· {feedbackList.length} review{feedbackList.length !== 1 ? 's' : ''}</Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={1}>Origin</Typography>
                <Typography variant="h6" fontWeight={700}>{orchid.origin}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={1}>Color</Typography>
                <Typography variant="h6" fontWeight={700} textTransform="capitalize">{orchid.color}</Typography>
              </Grid>
            </Grid>

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
              {orchid.description ? orchid.description : (
                <>
                  The <strong>{orchid.name}</strong> is a magnificent specimen from <strong>{orchid.origin}</strong>, known for its{' '}
                  <strong>{orchid.color}</strong> petals and {orchid.rating}/5 rating.
                  {orchid.isSpecial ? ' A rare and highly sought-after special variation.' : ''}
                </>
              )}
            </Typography>
          </Box>
        </Paper>

        {/* ── Feedback ────────────────────────────────────────────────────── */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h5" fontWeight={800}>💬 Member Feedback</Typography>
            <Chip label={`${feedbackList.length} review${feedbackList.length !== 1 ? 's' : ''}`} color="primary" variant="outlined" size="small" />
          </Box>

          {feedbackList.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '16px',
              border: `1px dashed ${isDark ? 'rgba(98,235,255,0.2)' : '#90caf9'}`, mb: 3,
              bgcolor: isDark ? 'rgba(21,101,192,0.05)' : '#f0f4ff' }}>
              <Typography color="text.secondary">🌊 No feedback yet — be the first to share!</Typography>
            </Paper>
          ) : (
            feedbackList.map((fb, i) => (
              <FeedbackCard key={`${fb.author}-${i}`} fb={fb} isOwner={user?.email === fb.author}
                onEdit={() => setIsEditing(true)}
                onDelete={async () => {
                  if (!window.confirm('Delete your feedback?')) return;
                  await dispatch(deleteFeedback({ orchidId: orchid.id, authorEmail: user.email }));
                  toast.success('Feedback deleted');
                }}
                theme={theme} />
            ))
          )}

          <Divider sx={{ my: 4 }} />

          {!user ? (
            <Alert severity="info" sx={{ borderRadius: '14px' }}
              action={<Button component={RouterLink} to="/login" startIcon={<LoginIcon />} variant="contained" size="small" color="primary">Login</Button>}>
              Login to leave your feedback and rating.
            </Alert>
          ) : myFeedback && !isEditing ? (
            <Alert severity="success" sx={{ borderRadius: '14px' }}
              action={<Button size="small" onClick={() => setIsEditing(true)} startIcon={<EditIcon />}>Edit</Button>}>
              You have already submitted feedback. Only one review per orchid is allowed.
            </Alert>
          ) : (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '20px',
              border: isDark ? '1px solid rgba(21,101,192,0.25)' : '1px solid #c5d9f5',
              bgcolor: isDark ? 'rgba(21,101,192,0.07)' : '#f0f4ff' }}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                {isEditing ? '✏️ Edit Your Review' : '⭐ Leave Your Review'}
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color="text.secondary" mb={0.5}>YOUR RATING *</Typography>
                    <Rating name="rating" value={formik.values.rating}
                      onChange={(_, val) => formik.setFieldValue('rating', val ?? 0)}
                      size="large" disabled={feedbackSubmitting} sx={{ fontSize: '2.2rem' }} />
                    {formik.touched.rating && formik.errors.rating && (
                      <Typography variant="caption" color="error">{formik.errors.rating}</Typography>
                    )}
                  </Box>
                  <TextField name="comment" label="Your Comment" multiline rows={4} fullWidth
                    value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.comment && Boolean(formik.errors.comment)}
                    helperText={formik.touched.comment && formik.errors.comment}
                    disabled={feedbackSubmitting} placeholder="Share your experience..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }} />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" size="large" color="primary"
                      disabled={feedbackSubmitting || !formik.isValid || !formik.dirty}
                      startIcon={feedbackSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                      sx={{ borderRadius: '30px', px: 5, fontWeight: 700 }}>
                      {feedbackSubmitting ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review'}
                    </Button>
                    {isEditing && (
                      <Button variant="outlined" size="large" onClick={() => { setIsEditing(false); formik.resetForm(); }}
                        disabled={feedbackSubmitting} sx={{ borderRadius: '30px', px: 4 }}>
                        Cancel
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
}
