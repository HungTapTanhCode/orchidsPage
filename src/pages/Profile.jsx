import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Avatar,
  Paper, Chip, CircularProgress, useTheme, Alert, Grid,
  Select, MenuItem, InputLabel, FormControl, FormHelperText,
  InputAdornment, Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import ImageIcon from '@mui/icons-material/Image';
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
    .nullable()
    .transform((v) => v || null),
  gender: Yup.string().oneOf(['male', 'female', 'other', ''], 'Invalid gender'),
  age: Yup.number()
    .typeError('Age must be a number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be under 120')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  phone: Yup.string()
    .matches(/^[0-9+()\-\s]*$/, 'Invalid phone number format')
    .max(20, 'Phone number is too long')
    .nullable(),
});

function InfoRow({ icon, label, value, placeholder, isDark }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: 2, py: 2,
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#e8f0fe'}`,
    }}>
      <Box sx={{
        p: 1, borderRadius: '10px',
        bgcolor: isDark ? 'rgba(21,101,192,0.15)' : '#e8f0fe',
        color: 'primary.main', display: 'flex', flexShrink: 0,
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700}
          textTransform="uppercase" letterSpacing={0.8} display="block">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.3 }}
          color={value ? 'text.primary' : 'text.disabled'}>
          {value || placeholder}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Profile() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const genderLabel = { male: 'Male', female: 'Female', other: 'Other' };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user?.displayName || '',
      photoURL:    user?.photoURL    || '',
      gender:      user?.gender      || '',
      age:         user?.age         || '',
      phone:       user?.phone       || '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        // Only displayName & photoURL go to Firebase Auth
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: values.displayName.trim(),
            photoURL: values.photoURL?.trim() || null,
          });
        }
        // All fields (incl. gender, age, phone) go to Redux + localStorage
        dispatch(updateUserInfo({
          displayName: values.displayName.trim(),
          photoURL:    values.photoURL?.trim() || null,
          gender:      values.gender   || null,
          age:         values.age !== '' ? Number(values.age) : null,
          phone:       values.phone?.trim() || null,
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
  const avatarSrc = (isEditing ? formik.values.photoURL : user?.photoURL) || undefined;

  return (
    <Box sx={{ minHeight: '85vh', bgcolor: isDark ? '#0a0f1e' : '#f0f4ff', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="sm">
        {/* Page header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight={800} color={isDark ? '#e8eaf6' : '#0d1b3e'}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Manage your personal information
          </Typography>
        </Box>

        <Paper elevation={0} sx={{
          borderRadius: '28px', overflow: 'hidden',
          border: isDark ? '1px solid rgba(98,235,255,0.1)' : '1px solid #c5d9f5',
          bgcolor: isDark ? '#111827' : '#ffffff',
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 10px 40px rgba(21,101,192,0.1)',
        }}>

          {/* ── Top Banner ─────────────────────────────────────────────── */}
          <Box sx={{
            background: 'linear-gradient(120deg, #0d47a1 0%, #1565c0 60%, #00b8d4 100%)',
            pt: 5, pb: 5, px: 4, textAlign: 'center', position: 'relative',
          }}>
            <Box sx={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
            <Box sx={{ position: 'absolute', bottom: -60, left: -30, width: 220, height: 220, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />

            <Avatar src={avatarSrc} sx={{
              width: 96, height: 96, fontSize: 36, fontWeight: 800, mx: 'auto',
              bgcolor: user?.isAdmin ? '#f9a825' : '#1976d2',
              border: user?.isAdmin ? '3px solid #ffd54f' : '3px solid #62ebff',
              boxShadow: user?.isAdmin ? '0 0 20px rgba(249,168,37,0.5)' : '0 0 20px rgba(98,235,255,0.4)',
              position: 'relative', zIndex: 1,
            }}>
              {!avatarSrc ? avatarLetter : null}
            </Avatar>

            <Typography variant="h5" fontWeight={800} sx={{ color: 'white', mt: 2, mb: 1 }}>
              {user?.displayName || 'User'}
            </Typography>

            {/* badges */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={user?.isAdmin ? <AdminPanelSettingsIcon sx={{ fontSize: 15 }} /> : <PersonIcon sx={{ fontSize: 15 }} />}
                label={user?.isAdmin ? 'Admin' : 'Member'}
                size="small"
                sx={{
                  bgcolor: user?.isAdmin ? 'rgba(249,168,37,0.25)' : 'rgba(255,255,255,0.15)',
                  color: user?.isAdmin ? '#ffd54f' : 'rgba(255,255,255,0.9)',
                  fontWeight: 700,
                  border: user?.isAdmin ? '1px solid rgba(249,168,37,0.4)' : '1px solid rgba(255,255,255,0.3)',
                }}
              />
              {user?.gender && (
                <Chip label={genderLabel[user.gender] || user.gender} size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }} />
              )}
              {user?.age && (
                <Chip label={`${user.age} yrs`} size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }} />
              )}
            </Box>
          </Box>

          {/* ── Body ──────────────────────────────────────────────────── */}
          <Box sx={{ px: { xs: 3, md: 5 }, pb: 5, pt: 4 }}>

            {!isEditing ? (
              /* ── View Mode ─────────────────────────────────────────── */
              <>
                <InfoRow icon={<EmailIcon fontSize="small" />}    label="Email"         value={user?.email}                      placeholder="—"               isDark={isDark} />
                <InfoRow icon={<PersonIcon fontSize="small" />}   label="Display Name"  value={user?.displayName}                placeholder="Not set"         isDark={isDark} />
                <InfoRow icon={<WcIcon fontSize="small" />}       label="Gender"        value={genderLabel[user?.gender] || null} placeholder="Not set"        isDark={isDark} />
                <InfoRow icon={<CakeIcon fontSize="small" />}     label="Age"           value={user?.age ? `${user.age} years old` : null} placeholder="Not set" isDark={isDark} />
                <InfoRow icon={<PhoneIcon fontSize="small" />}    label="Phone Number"  value={user?.phone}                      placeholder="Not set"         isDark={isDark} />
                <InfoRow icon={<ImageIcon fontSize="small" />}    label="Photo URL"     value={user?.photoURL}                   placeholder="No photo URL set" isDark={isDark} />

                <Button
                  fullWidth variant="contained" startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{
                    mt: 4, py: 1.5, borderRadius: '14px', fontWeight: 700, fontSize: '1rem',
                    background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                    boxShadow: isDark ? 'none' : '0 6px 20px rgba(21,101,192,0.3)',
                    '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' },
                  }}
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              /* ── Edit Mode ─────────────────────────────────────────── */
              <form onSubmit={formik.handleSubmit}>
                <Alert severity="info" sx={{ borderRadius: '12px', mb: 3, fontSize: '0.85rem' }}>
                  Email cannot be changed. Gender, age, and phone are saved locally.
                </Alert>

                <Grid container spacing={2.5}>
                  {/* Display Name */}
                  <Grid item xs={12}>
                    <TextField
                      name="displayName" label="Display Name" fullWidth
                      value={formik.values.displayName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                      helperText={formik.touched.displayName && formik.errors.displayName}
                      disabled={saving}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label" name="gender" label="Gender"
                        value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        disabled={saving}
                        startAdornment={<InputAdornment position="start"><WcIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment>}
                        sx={{ borderRadius: '12px' }}
                      >
                        <MenuItem value=""><em>Prefer not to say</em></MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                      {formik.touched.gender && formik.errors.gender && (
                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Age */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="age" label="Age" fullWidth type="number"
                      value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      helperText={formik.touched.age && formik.errors.age}
                      disabled={saving}
                      inputProps={{ min: 1, max: 120 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><CakeIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12}>
                    <TextField
                      name="phone" label="Phone Number" fullWidth
                      value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                      disabled={saving} placeholder="+84 xxx xxx xxx"
                      InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>

                  {/* Photo URL */}
                  <Grid item xs={12}>
                    <TextField
                      name="photoURL" label="Profile Picture URL (optional)" fullWidth
                      value={formik.values.photoURL} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched.photoURL && Boolean(formik.errors.photoURL)}
                      helperText={(formik.touched.photoURL && formik.errors.photoURL) || 'Paste a direct image URL'}
                      disabled={saving} placeholder="https://example.com/photo.jpg"
                      InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>

                  {/* Live avatar preview */}
                  {formik.values.photoURL && !formik.errors.photoURL && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2,
                        borderRadius: '12px', bgcolor: isDark ? 'rgba(21,101,192,0.1)' : '#f0f4ff',
                        border: isDark ? '1px solid rgba(21,101,192,0.2)' : '1px solid #dce8f5' }}>
                        <Avatar src={formik.values.photoURL} sx={{ width: 48, height: 48 }}>{avatarLetter}</Avatar>
                        <Typography variant="body2" color="text.secondary">Avatar preview</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit" variant="contained" fullWidth
                    disabled={saving || !formik.isValid || !formik.dirty}
                    startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                    sx={{
                      py: 1.4, borderRadius: '14px', fontWeight: 700,
                      background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                      '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' },
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined" fullWidth disabled={saving}
                    startIcon={<CancelIcon />}
                    onClick={() => { setIsEditing(false); formik.resetForm(); }}
                    sx={{ py: 1.4, borderRadius: '14px', fontWeight: 700 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
