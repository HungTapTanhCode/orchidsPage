import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Avatar,
  Paper, Divider, Chip, CircularProgress, useTheme, Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../features/authSlice';
import { auth } from '../services/firebase';
import { updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const profileSchema = Yup.object({
  displayName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Display name is required'),
  photoURL: Yup.string()
    .url('Must be a valid URL (e.g. https://...)')
    .nullable(),
});

export default function Profile() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        // Update Firebase Auth profile
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: values.displayName.trim(),
            photoURL: values.photoURL.trim() || null,
          });
        }
        // Update Redux + localStorage
        dispatch(updateUserInfo({
          displayName: values.displayName.trim(),
          photoURL: values.photoURL.trim() || null,
        }));
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to update profile. Please try again.');
      } finally {
        setSaving(false);
      }
    },
  });

  const avatarLetter = user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';
  const avatarSrc = formik.values.photoURL || user?.photoURL || undefined;

  return (
    <Box
      sx={{
        minHeight: '85vh',
        bgcolor: isDark ? '#0a0f1e' : '#f0f4ff',
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight={800} color={isDark ? '#e8eaf6' : '#0d1b3e'}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Manage your personal information
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: '28px',
            overflow: 'hidden',
            border: isDark ? '1px solid rgba(98,235,255,0.1)' : '1px solid #c5d9f5',
            bgcolor: isDark ? '#111827' : '#ffffff',
            boxShadow: isDark
              ? '0 20px 60px rgba(0,0,0,0.4)'
              : '0 10px 40px rgba(21,101,192,0.1)',
          }}
        >
          {/* Top Banner */}
          <Box
            sx={{
              background: 'linear-gradient(120deg, #0d47a1 0%, #1565c0 60%, #00b8d4 100%)',
              pt: 5,
              pb: 7,
              px: 4,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -40, right: -40,
                width: 180, height: 180,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.06)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -60, left: -30,
                width: 220, height: 220,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.04)',
              }}
            />

            {/* Avatar */}
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={avatarSrc}
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: 36,
                  fontWeight: 800,
                  bgcolor: user?.isAdmin ? '#f9a825' : '#1976d2',
                  border: user?.isAdmin ? '3px solid #ffd54f' : '3px solid #62ebff',
                  boxShadow: user?.isAdmin
                    ? '0 0 20px rgba(249,168,37,0.5)'
                    : '0 0 20px rgba(98,235,255,0.4)',
                  mx: 'auto',
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                {!avatarSrc ? avatarLetter : null}
              </Avatar>
            </Box>

            <Typography variant="h5" fontWeight={800} sx={{ color: 'white', mt: 2, mb: 0.5 }}>
              {user?.displayName || 'User'}
            </Typography>
            <Chip
              icon={user?.isAdmin ? <AdminPanelSettingsIcon sx={{ fontSize: 16 }} /> : <PersonIcon sx={{ fontSize: 16 }} />}
              label={user?.isAdmin ? 'Admin' : 'Member'}
              size="small"
              sx={{
                bgcolor: user?.isAdmin ? 'rgba(249,168,37,0.25)' : 'rgba(255,255,255,0.15)',
                color: user?.isAdmin ? '#ffd54f' : 'rgba(255,255,255,0.9)',
                fontWeight: 700,
                border: user?.isAdmin ? '1px solid rgba(249,168,37,0.4)' : '1px solid rgba(255,255,255,0.3)',
              }}
            />
          </Box>

          {/* Body — offset avatar overlap */}
          <Box sx={{ px: { xs: 3, md: 5 }, pb: 5, pt: 4 }}>

            {/* Email (read-only) */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                borderRadius: '14px',
                bgcolor: isDark ? 'rgba(21,101,192,0.08)' : '#f0f4ff',
                border: isDark ? '1px solid rgba(21,101,192,0.15)' : '1px solid #dce8f5',
                mb: 4,
              }}
            >
              <EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
                  Email (cannot be changed)
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            {!isEditing ? (
              /* ── View mode ──────────────────────────────────────────── */
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
                    Display Name
                  </Typography>
                  <Typography variant="h6" fontWeight={700} mt={0.5}>
                    {user?.displayName || <span style={{ color: theme.palette.text.disabled }}>Not set</span>}
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
                    Profile Picture URL
                  </Typography>
                  <Typography variant="body2" mt={0.5} sx={{ wordBreak: 'break-all', color: user?.photoURL ? 'primary.main' : 'text.disabled' }}>
                    {user?.photoURL || 'No photo URL set'}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{
                    py: 1.5,
                    borderRadius: '14px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                    boxShadow: isDark ? 'none' : '0 6px 20px rgba(21,101,192,0.3)',
                    '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' },
                  }}
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              /* ── Edit mode ──────────────────────────────────────────── */
              <form onSubmit={formik.handleSubmit}>
                <Alert
                  severity="info"
                  sx={{ borderRadius: '12px', mb: 3, fontSize: '0.85rem' }}
                >
                  Changes will be saved to your Google account profile.
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    name="displayName"
                    label="Display Name"
                    fullWidth
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName}
                    disabled={saving}
                    placeholder="Enter your display name"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />

                  <TextField
                    name="photoURL"
                    label="Profile Picture URL (optional)"
                    fullWidth
                    value={formik.values.photoURL}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.photoURL && Boolean(formik.errors.photoURL)}
                    helperText={
                      (formik.touched.photoURL && formik.errors.photoURL) ||
                      'Paste a direct image URL (e.g. from imgur, Google Photos...)'
                    }
                    disabled={saving}
                    placeholder="https://example.com/your-photo.jpg"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />

                  {/* Preview avatar live */}
                  {formik.values.photoURL && !formik.errors.photoURL && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2,
                      borderRadius: '12px', bgcolor: isDark ? 'rgba(21,101,192,0.1)' : '#f0f4ff',
                      border: isDark ? '1px solid rgba(21,101,192,0.2)' : '1px solid #dce8f5' }}>
                      <Avatar src={formik.values.photoURL} sx={{ width: 48, height: 48 }}>
                        {avatarLetter}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        Avatar preview
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={saving || !formik.isValid || !formik.dirty}
                      startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                      sx={{
                        py: 1.4,
                        borderRadius: '14px',
                        fontWeight: 700,
                        background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                        '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' },
                      }}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      disabled={saving}
                      startIcon={<CancelIcon />}
                      onClick={() => { setIsEditing(false); formik.resetForm(); }}
                      sx={{ py: 1.4, borderRadius: '14px', fontWeight: 700 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
