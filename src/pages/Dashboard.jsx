import React, { useEffect, useState, useMemo } from 'react';
import {
  Container, Typography, Box, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Switch,
  FormControlLabel, CircularProgress, Avatar, Chip, Menu, MenuItem,
  ListItemIcon, ListItemText, Grid, Select, InputLabel, FormControl, FormHelperText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector, useDispatch } from 'react-redux';
import { addOrchid, updateOrchid, deleteOrchid, fetchOrchids } from '../features/orchidsSlice';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material';

export default function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { items, status, submitting } = useSelector((state) => state.orchids);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);

  // Menu state for 3-dots action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOrchidId, setMenuOrchidId] = useState(null);
  const [menuOrchid, setMenuOrchid] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrchids());
    }
  }, [status, dispatch]);

  // Extract unique categories from items
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(o => o.category))].filter(Boolean);
    if (cats.length === 0) return ['Taichung', 'Phalaenopsis', 'Cattleya', 'Dendrobium', 'Vanda'];
    return cats;
  }, [items]);

  const handleMenuClick = (event, orchid) => {
    setAnchorEl(event.currentTarget);
    setMenuOrchidId(orchid.id);
    setMenuOrchid(orchid);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrchidId(null);
    setMenuOrchid(null);
  };

  const handleOpen = (orchid = null) => {
    setEditingOrchid(orchid);
    if (orchid) {
      formik.setValues({
        id: orchid.id,
        name: orchid.name || '',
        image: orchid.image || '',
        color: orchid.color || '#1565c0', // Default hex if empty
        origin: orchid.origin || '',
        category: orchid.category || '',
        description: orchid.description || '',
        rating: orchid.rating ?? 5,
        isSpecial: orchid.isSpecial ?? false,
        isNatural: orchid.isNatural ?? false,
        numberOfLike: orchid.numberOfLike ?? 0,
      });
    } else {
      formik.resetForm();
    }
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    if (submitting) return;
    setOpen(false);
    setEditingOrchid(null);
  };

  const handleDelete = async (id) => {
    if (submitting) return;
    if (window.confirm('Are you sure you want to delete this orchid?')) {
      await dispatch(deleteOrchid(id));
      toast.success('Orchid deleted');
    }
    handleMenuClose();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      color: '#1565c0', // Hex format required for color picker
      origin: '',
      category: '',
      description: '',
      rating: 5,
      isSpecial: false,
      isNatural: false,
      numberOfLike: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      image: Yup.string().url('Must be a valid URL').required('Required'),
      color: Yup.string().required('Required'),
      origin: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (submitting) return;
      if (editingOrchid) {
        await dispatch(updateOrchid(values));
        toast.success('Orchid updated successfully');
      } else {
        await dispatch(addOrchid(values));
        toast.success('Orchid added successfully');
      }
      setOpen(false);
      setEditingOrchid(null);
    },
  });

  return (
    <Box sx={{ bgcolor: isDark ? '#0a0f1e' : '#f0f4ff', minHeight: '85vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {/* Modern Header */}
        <Box sx={{ 
          display: 'flex', flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, 
          mb: 5, gap: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5, borderRadius: '14px', 
              background: 'linear-gradient(135deg, #1565c0 0%, #00b8d4 100%)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(21,101,192,0.3)'
            }}>
              <DashboardIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h3" fontWeight={800} color={isDark ? '#e8eaf6' : '#0d1b3e'}>
                Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight={500}>
                Welcome back, {user?.displayName || user?.email}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            disabled={submitting}
            size="large"
            sx={{
              py: 1.5, px: 3, borderRadius: '16px', fontWeight: 700,
              background: 'linear-gradient(90deg, #1565c0, #00b8d4)',
              boxShadow: isDark ? 'none' : '0 8px 24px rgba(0,184,212,0.3)',
              '&:hover': { background: 'linear-gradient(90deg, #0d47a1, #1565c0)' }
            }}
          >
            Add New Orchid
          </Button>
        </Box>

        {/* Enhanced Table */}
        <Paper elevation={0} sx={{
          borderRadius: '24px', overflow: 'hidden',
          border: isDark ? '1px solid rgba(98,235,255,0.1)' : '1px solid #c5d9f5',
          bgcolor: isDark ? '#111827' : '#ffffff',
          boxShadow: isDark ? '0 24px 60px rgba(0,0,0,0.4)' : '0 12px 40px rgba(21,101,192,0.08)',
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: isDark ? 'rgba(21,101,192,0.15)' : '#e8f0fe' }}>
                  <TableCell sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, py: 2.5 }}>Orchid</TableCell>
                  <TableCell sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Category</TableCell>
                  <TableCell sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Origin</TableCell>
                  <TableCell sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Color</TableCell>
                  <TableCell sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Type</TableCell>
                  <TableCell align="right" sx={{ color: isDark ? '#90caf9' : '#1565c0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {status === 'loading' && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <CircularProgress color="primary" />
                    </TableCell>
                  </TableRow>
                )}
                {items.map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={row.image} variant="rounded" sx={{ width: 64, height: 64, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Typography variant="body1" fontWeight={700} color={isDark ? '#e8eaf6' : '#0d1b3e'}>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={row.category} size="small" sx={{ fontWeight: 600, bgcolor: isDark ? 'rgba(98,235,255,0.1)' : '#e3f2fd', color: isDark ? '#62ebff' : '#1565c0' }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="text.secondary">{row.origin}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: row.color, border: '1px solid rgba(0,0,0,0.1)' }} title={row.color} />
                        <Typography variant="body2" fontWeight={600} textTransform="capitalize">{row.color}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {row.isNatural
                          ? <Chip label="Natural" color="success" size="small" sx={{ fontWeight: 700 }} />
                          : <Chip label="Hybrid" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />}
                        {row.isSpecial && <Chip label="Special" size="small" sx={{ fontWeight: 700, bgcolor: '#f9a825', color: '#000' }} />}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {/* 3-dots Menu Icon */}
                      <IconButton 
                        onClick={(e) => handleMenuClick(e, row)}
                        sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#f0f4ff', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : '#dce8f5' } }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Dropdown Menu for Actions */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1, overflow: 'visible', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.15))',
              borderRadius: '16px', minWidth: 160,
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0',
            },
          }}
        >
          <MenuItem onClick={() => handleOpen(menuOrchid)} sx={{ py: 1.5 }}>
            <ListItemIcon><EditIcon fontSize="small" color="primary" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>Edit Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleDelete(menuOrchidId)} sx={{ py: 1.5, color: 'error.main' }}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>Delete Orchid</ListItemText>
          </MenuItem>
        </Menu>

        {/* Form Dialog for Add/Edit */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '24px', overflow: 'hidden' } }}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ background: 'linear-gradient(90deg, #1565c0, #1976d2)', py: 3, px: 4, color: 'white' }}>
              <Typography variant="h5" fontWeight={800}>
                {editingOrchid ? '✏️ Edit Orchid Details' : '🌸 Add New Orchid'}
              </Typography>
            </Box>
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name" label="Name" fullWidth
                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={submitting}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label" name="category"
                      value={formik.values.category} label="Category"
                      onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={submitting}
                      sx={{ borderRadius: '12px' }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText>{formik.errors.category}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="image" label="Image URL" fullWidth
                    value={formik.values.image} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                    disabled={submitting}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="origin" label="Origin" fullWidth
                    value={formik.values.origin} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.origin && Boolean(formik.errors.origin)}
                    helperText={formik.touched.origin && formik.errors.origin}
                    disabled={submitting}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                      name="color" label="Color (Hex)" fullWidth
                      value={formik.values.color} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      error={formik.touched.color && Boolean(formik.errors.color)}
                      helperText={formik.touched.color && formik.errors.color}
                      disabled={submitting}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    <input
                      type="color"
                      name="color"
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      disabled={submitting}
                      style={{
                        width: 50, height: 50, padding: 0, border: 'none', borderRadius: '12px',
                        cursor: 'pointer', background: 'transparent'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description" label="Description" fullWidth multiline rows={3}
                    value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    disabled={submitting}
                    placeholder="Enter detailed description about this orchid..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 4, p: 2, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#f5f8ff', borderRadius: '16px' }}>
                    <FormControlLabel
                      control={<Switch checked={formik.values.isSpecial} onChange={formik.handleChange} name="isSpecial" disabled={submitting} />}
                      label={<Typography fontWeight={600}>Special Edition</Typography>}
                    />
                    <FormControlLabel
                      control={<Switch checked={formik.values.isNatural} onChange={formik.handleChange} name="isNatural" disabled={submitting} />}
                      label={<Typography fontWeight={600}>Natural Species</Typography>}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: isDark ? 'rgba(0,0,0,0.2)' : '#f9fbff', borderTop: '1px solid', borderColor: 'divider' }}>
              <Button onClick={handleClose} disabled={submitting} sx={{ borderRadius: '12px', fontWeight: 700, px: 3 }}>
                Cancel
              </Button>
              <Button
                type="submit" variant="contained" disabled={submitting || !formik.isValid}
                startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                sx={{ borderRadius: '12px', fontWeight: 700, px: 4, background: 'linear-gradient(90deg, #1565c0, #1976d2)', '&:hover': { background: '#0d47a1' } }}
              >
                {submitting ? 'Saving...' : 'Save Orchid'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
}
