import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Typography, Box, Grid, Paper, useTheme, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { toast } from 'react-toastify';

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Too long').required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().min(10, 'At least 10 characters').required('Message is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        toast.success(`Message sent successfully, ${values.name}!`);
        resetForm();
      }, 500);
    },
  });

  return (
    <Box sx={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      py: { xs: 6, md: 10 },
      bgcolor: isDark ? '#0a0f1e' : '#f0f4ff',
    }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' },
          borderRadius: '28px', overflow: 'hidden',
          border: isDark ? '1px solid rgba(98,235,255,0.1)' : '1px solid #c5d9f5',
          bgcolor: isDark ? '#111827' : '#ffffff',
          boxShadow: isDark ? '0 24px 60px rgba(0,0,0,0.5)' : '0 24px 60px rgba(21,101,192,0.1)',
        }}>

          {/* Left Panel */}
          <Box sx={{
            width: { xs: '100%', md: '40%' },
            background: 'linear-gradient(160deg, #0d47a1 0%, #1565c0 50%, #00b8d4 100%)',
            color: 'white', p: { xs: 5, md: 7 },
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            {/* Decorative blobs */}
            <Box sx={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.07)' }} />
            <Box sx={{ position: 'absolute', bottom: -100, left: -60, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>Get in Touch</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 6, lineHeight: 1.7 }}>
                Questions about our orchid collection? Our team is here to help with anything you need.
              </Typography>

              {[
                { icon: <LocationOnIcon />, title: 'Headquarters', text: '123 Orchid Botanical Way\nBlue Valley, CA 90210' },
                { icon: <PhoneIcon />, title: 'Phone', text: '+1 (555) 123-4567\nMon-Fri, 9am - 6pm' },
                { icon: <EmailIcon />, title: 'Email', text: 'hello@orchidsworld.com\nsupport@orchidsworld.com' },
              ].map(({ icon, title, text }) => (
                <Box key={title} sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                  <Box sx={{ mr: 2, mt: 0.5, color: '#62ebff' }}>{icon}</Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} fontSize="1rem">{title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5, whiteSpace: 'pre-line' }}>{text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, mt: 4, display: 'flex', gap: 1 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, i) => (
                <IconButton key={i} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Right Form Panel */}
          <Box sx={{ p: { xs: 4, md: 7 }, flex: 1 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight={800}>Send a Message</Typography>
              <Typography variant="body1" color="text.secondary">
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                {[
                  { id: 'name', label: 'Full Name', sm: 6 },
                  { id: 'email', label: 'Email Address', sm: 6 },
                  { id: 'message', label: 'Your Message', sm: 12, multiline: true, rows: 4 },
                ].map(({ id, label, sm, multiline, rows }) => (
                  <Grid key={id} xs={12} sm={sm}>
                    <TextField fullWidth id={id} name={id} label={label} variant="standard"
                      multiline={multiline} rows={rows}
                      value={formik.values[id]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched[id] && Boolean(formik.errors[id])}
                      helperText={formik.touched[id] && formik.errors[id]}
                      slotProps={{ input: { sx: { fontSize: '1.05rem', py: 1 } }, inputLabel: { sx: { fontSize: '1.05rem' } } }}
                    />
                  </Grid>
                ))}
                <Grid xs={12} sx={{ mt: 2 }}>
                  <Button color="primary" variant="contained" size="large" type="submit"
                    endIcon={<SendIcon />} disabled={!formik.isValid || !formik.dirty}
                    sx={{
                      px: 6, py: 1.5, fontSize: '1rem', borderRadius: '30px', fontWeight: 700,
                      background: 'linear-gradient(90deg,#1565c0,#1976d2)',
                      boxShadow: isDark ? 'none' : '0 8px 20px rgba(21,101,192,0.3)',
                      '&:hover': { background: 'linear-gradient(90deg,#0d47a1,#1565c0)' },
                    }}>
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
