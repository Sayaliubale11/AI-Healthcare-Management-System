// import React, { useState, useEffect } from 'react';
// import {
//   Box, Card, CardContent, Typography, TextField, Button,
//   Grid, CircularProgress, Alert, Avatar, MenuItem, Chip,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { MdSave } from 'react-icons/md';
// import { getProfile, updateProfile } from '../../api';
// import { useAuth } from '../../context/AuthContext';
// import Layout from '../../components/Layout';

// export default function DoctorProfile() {
//   const { user, setUser } = useAuth();

//   const [form, setForm] = useState({
//     first_name: '', last_name: '', phone: '', gender: '', dob: '', address: '',
//   });
//   const email = user?.email || '';

//   const [fetching, setFetching] = useState(true);
//   const [saving,   setSaving]   = useState(false);
//   const [error,    setError]    = useState('');

//   useEffect(() => {
//     getProfile()
//       .then((r) => {
//         const d = r.data;
//         setForm({
//           first_name: d.first_name || '',
//           last_name:  d.last_name  || '',
//           phone:      d.phone      || '',
//           gender:     d.gender     || '',
//           dob:        d.dob        || '',
//           address:    d.address    || '',
//         });
//       })
//       .catch(() => setError('Could not load profile.'))
//       .finally(() => setFetching(false));
//   }, []);

//   const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSave = async () => {
//     setSaving(true); setError('');
//     try {
//       await updateProfile(form);
//       setUser((prev) => ({ ...prev, ...form }));
//       toast.success('Profile updated! ✅');
//     } catch (err) {
//       const d = err.response?.data;
//       setError(
//         d && typeof d === 'object'
//           ? Object.entries(d).flatMap(([k, v]) => Array.isArray(v) ? v.map((m) => `${k}: ${m}`) : [`${k}: ${v}`]).join(' | ')
//           : 'Update failed. Please try again.'
//       );
//     } finally { setSaving(false); }
//   };

//   if (fetching) {
//     return (
//       <Layout>
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
//           <CircularProgress size={48} />
//         </Box>
//       </Layout>
//     );
//   }

//   const initial  = (form.first_name || email || 'D')[0].toUpperCase();
//   const fullName = [form.first_name, form.last_name].filter(Boolean).join(' ') || email.split('@')[0];

//   return (
//     <Layout>
//       <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 800, mx: 'auto' }}>

//         {/* Profile Banner */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//           <Card sx={{ mb: 3, overflow: 'visible' }}>
//             <Box sx={{ height: 110, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)', borderRadius: '16px 16px 0 0' }} />
//             <CardContent sx={{ pt: 0, pb: 3, px: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, mt: -5.5, mb: 1.5, flexWrap: 'wrap' }}>
//                 <Avatar sx={{
//                   width: 90, height: 90, fontSize: 32, fontWeight: 800,
//                   background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
//                   border: '4px solid #fff',
//                   boxShadow: '0 8px 24px rgba(14,165,233,.3)', flexShrink: 0,
//                 }}>
//                   {initial}
//                 </Avatar>
//                 <Box sx={{ pb: 1 }}>
//                   <Typography variant="h5" fontWeight={800} color="#0F172A">Dr. {fullName}</Typography>
//                   <Typography color="text.secondary" fontSize={14}>{email}</Typography>
//                   <Chip label="Doctor" size="small" sx={{ mt: 1, bgcolor: '#E0F2FE', color: '#0284C7', fontWeight: 700, fontSize: 11 }} />
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>
//         )}

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
//           <Card>
//             <CardContent sx={{ p: 3.5 }}>
//               <Typography variant="h6" fontWeight={700} mb={3}>Personal Information</Typography>

//               {/* Email — read only, clearly labeled */}
//               <TextField
//                 fullWidth label="Email Address" value={email} disabled
//                 sx={{ mb: 2.5, '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#64748B' } }}
//                 helperText="Email cannot be changed"
//               />

//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="First Name" name="first_name"
//                     value={form.first_name} onChange={onChange} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Last Name" name="last_name"
//                     value={form.last_name} onChange={onChange} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Phone Number" name="phone"
//                     value={form.phone} onChange={onChange}
//                     placeholder="+91 98765 43210" />
//                 </Grid>
//                 {/* Gender — clearly its own field, no icon overlap */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField select fullWidth label="Gender" name="gender"
//                     value={form.gender} onChange={onChange}>
//                     <MenuItem value="">Select Gender</MenuItem>
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                   </TextField>
//                 </Grid>
//                 {/* DOB — clearly labeled */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth label="Date of Birth" name="dob" type="date"
//                     value={form.dob} onChange={onChange}
//                     InputLabelProps={{ shrink: true }}
//                     inputProps={{ max: new Date().toISOString().split('T')[0] }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Address" name="address"
//                     value={form.address} onChange={onChange}
//                     placeholder="Your city / address" />
//                 </Grid>
//               </Grid>

//               <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'flex-end' }}>
//                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//                   <Button
//                     variant="contained" size="large"
//                     onClick={handleSave} disabled={saving}
//                     startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <MdSave size={20} />}
//                     sx={{
//                       minWidth: 200, py: 1.5, px: 4,
//                       borderRadius: 2.5, fontWeight: 700,
//                       boxShadow: '0 8px 24px rgba(14,165,233,.3)',
//                     }}
//                   >
//                     {saving ? 'Saving...' : 'Save Changes'}
//                   </Button>
//                 </motion.div>
//               </Box>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </Box>
//     </Layout>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Avatar,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  MdSave,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdPerson,
} from 'react-icons/md';

import { getProfile, updateProfile } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function DoctorProfile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
  });

  const email = user?.email || '';

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data;

        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          gender: data.gender || '',
          dob: data.dob || '',
          address: data.address || '',
        });
      } catch (err) {
        console.error(err);
        setError('Could not load your profile.');
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, []);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const onChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      await updateProfile(form);

      setUser((previous) => ({
        ...previous,
        ...form,
      }));

      toast.success('Profile updated successfully!');

    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      if (data && typeof data === 'object') {
        const message = Object.entries(data)
          .flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((item) => `${key}: ${item}`)
              : [`${key}: ${value}`]
          )
          .join(' | ');

        setError(message);
      } else {
        setError('Profile update failed. Please try again.');
      }

    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (fetching) {
    return (
      <Layout>
        <Box
          sx={{
            minHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={48} />
        </Box>
      </Layout>
    );
  }

  /* =========================================================
     DISPLAY DATA
  ========================================================= */

  const firstName =
    form.first_name ||
    email.split('@')[0] ||
    'Doctor';

  const fullName =
    [form.first_name, form.last_name]
      .filter(Boolean)
      .join(' ') ||
    email.split('@')[0] ||
    'Doctor';

  const initial =
    firstName.charAt(0).toUpperCase();

  /* =========================================================
     UI
  ========================================================= */

  return (
    <Layout>

      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: '#F8FAFC',
          py: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          px: {
            xs: 1.5,
            sm: 2,
            md: 4,
          },
        }}
      >

        {/* =====================================================
            MAIN CONTAINER
        ===================================================== */}

        <Box
          sx={{
            width: '100%',
            maxWidth: 1100,
            mx: 'auto',
          }}
        >

          {/* ===================================================
              PAGE TITLE
          =================================================== */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box sx={{ mb: 3 }}>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: {
                    xs: '1.7rem',
                    sm: '2rem',
                    md: '2.25rem',
                  },
                }}
              >
                My Profile
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: '#64748B',
                  fontSize: {
                    xs: '0.85rem',
                    sm: '0.95rem',
                  },
                }}
              >
                Manage your personal information and account details
              </Typography>

            </Box>
          </motion.div>

          {/* ===================================================
              ERROR
          =================================================== */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* ===================================================
              PROFILE HEADER
          =================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                mb: 3,
                background: '#FFFFFF',
              }}
            >

              {/* Gradient Banner */}

              <Box
                sx={{
                  height: {
                    xs: 120,
                    sm: 145,
                  },
                  background:
                    'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%)',
                  position: 'relative',
                }}
              >

                {/* Decorative circles */}

                <Box
                  sx={{
                    position: 'absolute',
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    right: -60,
                    top: -100,
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    left: -50,
                    bottom: -80,
                  }}
                />

              </Box>

              {/* Profile Information */}

              <Box
                sx={{
                  px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                  pb: 3,
                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: {
                      xs: 'center',
                      sm: 'flex-end',
                    },
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                    gap: 2.5,
                    mt: {
                      xs: -6,
                      sm: -6,
                    },
                    textAlign: {
                      xs: 'center',
                      sm: 'left',
                    },
                  }}
                >

                  {/* Avatar */}

                  <Avatar
                    sx={{
                      width: {
                        xs: 90,
                        sm: 105,
                      },
                      height: {
                        xs: 90,
                        sm: 105,
                      },
                      fontSize: {
                        xs: 32,
                        sm: 38,
                      },
                      fontWeight: 800,
                      bgcolor: '#0EA5E9',
                      background:
                        'linear-gradient(135deg,#0EA5E9,#06B6D4)',
                      border: '5px solid #fff',
                      boxShadow:
                        '0 8px 28px rgba(14,165,233,.28)',
                      flexShrink: 0,
                    }}
                  >
                    {initial}
                  </Avatar>

                  {/* Name */}

                  <Box
                    sx={{
                      pb: {
                        xs: 0,
                        sm: 1,
                      },
                      flex: 1,
                    }}
                  >

                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: '#0F172A',
                        fontSize: {
                          xs: '1.25rem',
                          sm: '1.5rem',
                        },
                      }}
                    >
                      Dr. {fullName}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: {
                          xs: 'center',
                          sm: 'flex-start',
                        },
                        gap: 0.7,
                        mt: 0.5,
                      }}
                    >

                      <MdEmail
                        size={17}
                        color="#64748B"
                      />

                      <Typography
                        sx={{
                          color: '#64748B',
                          fontSize: '0.9rem',
                        }}
                      >
                        {email}
                      </Typography>

                    </Box>

                    <Chip
                      label="Doctor"
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: '#E0F2FE',
                        color: '#0284C7',
                        fontWeight: 700,
                        borderRadius: 2,
                      }}
                    />

                  </Box>

                </Box>

              </Box>

            </Card>

          </motion.div>

          {/* ===================================================
              PERSONAL INFORMATION
          =================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >

            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
              }}
            >

              <CardContent
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                  '&:last-child': {
                    pb: {
                      xs: 2,
                      sm: 3,
                      md: 4,
                    },
                  },
                }}
              >

                {/* Section Header */}

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 3,
                  }}
                >

                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      bgcolor: '#EFF6FF',
                      color: '#0EA5E9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MdPerson size={22} />
                  </Box>

                  <Box>

                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: '#0F172A',
                        fontSize: '1.15rem',
                      }}
                    >
                      Personal Information
                    </Typography>

                    <Typography
                      sx={{
                        color: '#64748B',
                        fontSize: '0.8rem',
                      }}
                    >
                      Keep your profile information up to date
                    </Typography>

                  </Box>

                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* =================================================
                    EMAIL
                ================================================= */}

                <TextField
                  fullWidth
                  label="Email Address"
                  value={email}
                  disabled
                  helperText="Email address cannot be changed"
                  sx={{
                    mb: 3,

                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#64748B',
                    },
                  }}
                />

                {/* =================================================
                    FORM GRID
                ================================================= */}

                <Grid
                  container
                  spacing={{
                    xs: 2,
                    sm: 2.5,
                  }}
                >

                  {/* First Name */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      value={form.first_name}
                      onChange={onChange}
                      InputProps={{
                        startAdornment: (
                          <MdPerson
                            size={19}
                            color="#94A3B8"
                            style={{
                              marginRight: 8,
                            }}
                          />
                        ),
                      }}
                    />

                  </Grid>

                  {/* Last Name */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      label="Last Name"
                      name="last_name"
                      value={form.last_name}
                      onChange={onChange}
                    />

                  </Grid>

                  {/* Phone */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="+91 98765 43210"
                      InputProps={{
                        startAdornment: (
                          <MdPhone
                            size={19}
                            color="#94A3B8"
                            style={{
                              marginRight: 8,
                            }}
                          />
                        ),
                      }}
                    />

                  </Grid>

                  {/* Gender */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      select
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={form.gender}
                      onChange={onChange}
                    >

                      <MenuItem value="">
                        Select Gender
                      </MenuItem>

                      <MenuItem value="Male">
                        Male
                      </MenuItem>

                      <MenuItem value="Female">
                        Female
                      </MenuItem>

                      <MenuItem value="Other">
                        Other
                      </MenuItem>

                    </TextField>

                  </Grid>

                  {/* Date of Birth */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={form.dob}
                      onChange={onChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: new Date()
                          .toISOString()
                          .split('T')[0],
                      }}
                      InputProps={{
                        startAdornment: (
                          <MdCalendarToday
                            size={18}
                            color="#94A3B8"
                            style={{
                              marginRight: 8,
                            }}
                          />
                        ),
                      }}
                    />

                  </Grid>

                  {/* Address */}

                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      placeholder="Your city / address"
                      InputProps={{
                        startAdornment: (
                          <MdLocationOn
                            size={19}
                            color="#94A3B8"
                            style={{
                              marginRight: 8,
                            }}
                          />
                        ),
                      }}
                    />

                  </Grid>

                </Grid>

                {/* =================================================
                    SAVE BUTTON
                ================================================= */}

                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: '1px solid #E2E8F0',
                    display: 'flex',
                    justifyContent: {
                      xs: 'stretch',
                      sm: 'flex-end',
                    },
                  }}
                >

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    style={{
                      width: '100%',
                      maxWidth: 220,
                    }}
                  >

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSave}
                      disabled={saving}
                      startIcon={
                        saving ? (
                          <CircularProgress
                            size={18}
                            color="inherit"
                          />
                        ) : (
                          <MdSave size={20} />
                        )
                      }
                      sx={{
                        py: 1.5,
                        borderRadius: 2.5,
                        fontWeight: 700,
                        boxShadow:
                          '0 8px 24px rgba(14,165,233,.25)',
                      }}
                    >
                      {saving
                        ? 'Saving...'
                        : 'Save Changes'}
                    </Button>

                  </motion.div>

                </Box>

              </CardContent>

            </Card>

          </motion.div>

        </Box>

      </Box>

    </Layout>
  );
}