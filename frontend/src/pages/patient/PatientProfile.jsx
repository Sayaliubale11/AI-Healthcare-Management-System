// import React, { useState, useEffect } from 'react';
// import {
//   Box, Card, CardContent, Typography, TextField, Button,
//   Grid, CircularProgress, Alert, Avatar, MenuItem, Chip,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { MdSave, MdPerson, MdFavorite, MdEmail } from 'react-icons/md';
// import { getProfile, updateProfile, getPatientProfile, updatePatientProfile } from '../../api';
// import { useAuth } from '../../context/AuthContext';
// import Layout from '../../components/Layout';

// export default function PatientProfile() {
//   const { user, setUser } = useAuth();

//   const [uForm, setUForm] = useState({
//     first_name: '', last_name: '', phone: '', gender: '', dob: '', address: '',
//   });
//   const email = user?.email || '';

//   const [pForm, setPForm] = useState({
//     blood_group: '', height: '', weight: '',
//     emergency_contact: '', allergies: '', medical_history: '',
//   });

//   const [fetching, setFetching] = useState(true);
//   const [saving,   setSaving]   = useState(false);
//   const [error,    setError]    = useState('');
//   const [success,  setSuccess]  = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const [uRes, pRes] = await Promise.all([getProfile(), getPatientProfile()]);
//         const u = uRes.data;
//         setUForm({
//           first_name: u.first_name || '',
//           last_name:  u.last_name  || '',
//           phone:      u.phone      || '',
//           gender:     u.gender     || '',
//           dob:        u.dob        || '',
//           address:    u.address    || '',
//         });
//         const p = pRes.data;
//         setPForm({
//           blood_group:       p.blood_group       || '',
//           height:            p.height != null    ? String(p.height) : '',
//           weight:            p.weight != null    ? String(p.weight) : '',
//           emergency_contact: p.emergency_contact || '',
//           allergies:         p.allergies         || '',
//           medical_history:   p.medical_history   || '',
//         });
//       } catch {
//         setError('Could not load profile. Please refresh the page.');
//       } finally {
//         setFetching(false);
//       }
//     })();
//   }, []);

//   const uChange = (e) => setUForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//   const pChange = (e) => setPForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSave = async () => {
//     setSaving(true); setError(''); setSuccess(false);
//     try {
//       await updateProfile(uForm);
//       await updatePatientProfile({
//         blood_group:       pForm.blood_group,
//         height:            pForm.height ? parseFloat(pForm.height) : null,
//         weight:            pForm.weight ? parseFloat(pForm.weight) : null,
//         emergency_contact: pForm.emergency_contact,
//         allergies:         pForm.allergies,
//         medical_history:   pForm.medical_history,
//       });
//       setUser((prev) => ({ ...prev, ...uForm }));
//       setSuccess(true);
//       toast.success('Profile saved successfully! ✅');
//     } catch (err) {
//       const d = err.response?.data;
//       setError(
//         d && typeof d === 'object'
//           ? Object.entries(d).flatMap(([k, v]) => Array.isArray(v) ? v.map((m) => `${k}: ${m}`) : [`${k}: ${v}`]).join(' | ')
//           : 'Save failed. Please try again.'
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

//   const initial  = (uForm.first_name || email || 'P')[0].toUpperCase();
//   const fullName = [uForm.first_name, uForm.last_name].filter(Boolean).join(' ') || email.split('@')[0];

//   return (
//     <Layout>
//       <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 900, mx: 'auto' }}>

//         {/* Profile Banner */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//           <Card sx={{ mb: 3, overflow: 'visible' }}>
//             <Box sx={{ height: 110, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)', borderRadius: '16px 16px 0 0' }} />
//             <CardContent sx={{ pt: 0, pb: 3, px: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, mt: -5.5, mb: 2, flexWrap: 'wrap' }}>
//                 <Avatar sx={{
//                   width: 90, height: 90, fontSize: 32, fontWeight: 800,
//                   background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
//                   border: '4px solid #fff',
//                   boxShadow: '0 8px 24px rgba(14,165,233,.3)', flexShrink: 0,
//                 }}>
//                   {initial}
//                 </Avatar>
//                 <Box sx={{ pb: 1 }}>
//                   <Typography variant="h5" fontWeight={800} color="#0F172A">{fullName}</Typography>
//                   <Typography color="text.secondary" fontSize={14}>{email}</Typography>
//                   <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
//                     <Chip label="Patient" size="small" sx={{ bgcolor: '#E0F2FE', color: '#0284C7', fontWeight: 700, fontSize: 11 }} />
//                     {pForm.blood_group && (
//                       <Chip label={`Blood: ${pForm.blood_group}`} size="small" sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 700, fontSize: 11 }} />
//                     )}
//                     {uForm.gender && (
//                       <Chip label={uForm.gender} size="small" sx={{ bgcolor: '#F3F4F6', color: '#374151', fontWeight: 600, fontSize: 11 }} />
//                     )}
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>
//         )}
//         {success && (
//           <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setSuccess(false)}>
//             Profile updated successfully!
//           </Alert>
//         )}

//         <Grid container spacing={3}>

//           {/* ── Personal Information ── */}
//           <Grid item xs={12} md={6}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//                     <Box sx={{ width: 38, height: 38, bgcolor: '#E0F2FE', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <MdPerson size={20} color="#0EA5E9" />
//                     </Box>
//                     <Typography variant="h6" fontWeight={700}>Personal Information</Typography>
//                   </Box>

//                   {/* Email — read-only */}
//                   <TextField
//                     fullWidth label="Email Address" value={email} disabled
//                     sx={{ mb: 2.5, '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#64748B' } }}
//                     helperText="Email cannot be changed"
//                   />

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <TextField fullWidth label="First Name" name="first_name"
//                         value={uForm.first_name} onChange={uChange} size="small" />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField fullWidth label="Last Name" name="last_name"
//                         value={uForm.last_name} onChange={uChange} size="small" />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField fullWidth label="Phone Number" name="phone"
//                         value={uForm.phone} onChange={uChange} size="small"
//                         placeholder="+91 98765 43210" />
//                     </Grid>
//                     {/* Gender — its own row, no icon overlap */}
//                     <Grid item xs={12}>
//                       <TextField
//                         select fullWidth label="Gender" name="gender"
//                         value={uForm.gender} onChange={uChange} size="small"
//                       >
//                         <MenuItem value="">Select Gender</MenuItem>
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                         <MenuItem value="Other">Other</MenuItem>
//                         <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
//                       </TextField>
//                     </Grid>
//                     {/* DOB — its own row, clear label */}
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth label="Date of Birth" name="dob" type="date"
//                         value={uForm.dob} onChange={uChange} size="small"
//                         InputLabelProps={{ shrink: true }}
//                         inputProps={{ max: new Date().toISOString().split('T')[0] }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField fullWidth label="Address" name="address"
//                         value={uForm.address} onChange={uChange} size="small"
//                         multiline rows={2} placeholder="Your full address" />
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>

//           {/* ── Health Information ── */}
//           <Grid item xs={12} md={6}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//                     <Box sx={{ width: 38, height: 38, bgcolor: '#FEE2E2', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <MdFavorite size={20} color="#EF4444" />
//                     </Box>
//                     <Typography variant="h6" fontWeight={700}>Health Information</Typography>
//                   </Box>

//                   <Grid container spacing={2.5}>
//   {/* Email — read only, clearly labeled */}
//   <Grid item xs={12}>
//     <TextField
//       fullWidth label="Email Address" value={email} disabled
//       sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#64748B' } }}
//       helperText="Email cannot be changed"
//     />
//   </Grid>
//   {/* First + Last name */}
//   <Grid item xs={12} sm={6}>
//     <TextField fullWidth label="First Name" name="first_name"
//       value={uForm.first_name} onChange={uChange} />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField fullWidth label="Last Name" name="last_name"
//       value={uForm.last_name} onChange={uChange} />
//   </Grid>
//   {/* Phone — full row */}
//   <Grid item xs={12}>
//     <TextField fullWidth label="Phone Number" name="phone"
//       value={uForm.phone} onChange={uChange} placeholder="+91 98765 43210" />
//   </Grid>
//   {/* Gender — its OWN full row, no icons in same row */}
//   <Grid item xs={12} sm={6}>
//     <TextField select fullWidth label="Gender" name="gender"
//       value={uForm.gender} onChange={uChange}>
//       <MenuItem value="">Select Gender</MenuItem>
//       <MenuItem value="Male">Male</MenuItem>
//       <MenuItem value="Female">Female</MenuItem>
//       <MenuItem value="Other">Other</MenuItem>
//       <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
//     </TextField>
//   </Grid>
//   {/* DOB — its OWN clear field, shrink label prevents overlap */}
//   <Grid item xs={12} sm={6}>
//     <TextField fullWidth label="Date of Birth" name="dob" type="date"
//       value={uForm.dob} onChange={uChange}
//       InputLabelProps={{ shrink: true }}
//     />
//   </Grid>
//   {/* Address */}
//   <Grid item xs={12}>
//     <TextField fullWidth label="Address" name="address"
//       value={uForm.address} onChange={uChange}
//       multiline rows={2} placeholder="Your full address" />
//   </Grid>
// </Grid>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         </Grid>

//         {/* Save Button */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//               <Button
//                 variant="contained" size="large"
//                 onClick={handleSave} disabled={saving}
//                 startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <MdSave size={20} />}
//                 sx={{
//                   minWidth: 200, py: 1.5, px: 4,
//                   borderRadius: 2.5, fontWeight: 700, fontSize: '0.95rem',
//                   boxShadow: '0 8px 24px rgba(14,165,233,.3)',
//                 }}
//               >
//                 {saving ? 'Saving Changes...' : 'Save All Changes'}
//               </Button>
//             </motion.div>
//           </Box>
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
} from '@mui/material';

import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import {
  MdSave,
  MdPerson,
  MdFavorite,
} from 'react-icons/md';

import {
  getProfile,
  updateProfile,
  getPatientProfile,
  updatePatientProfile,
} from '../../api';

import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';


export default function PatientProfile() {

  const { user, setUser } = useAuth();

  // -----------------------------
  // USER / PERSONAL INFORMATION
  // -----------------------------

  const [uForm, setUForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
  });

  // -----------------------------
  // PATIENT HEALTH INFORMATION
  // -----------------------------

  const [pForm, setPForm] = useState({
    blood_group: '',
    height: '',
    weight: '',
    emergency_contact: '',
    allergies: '',
    medical_history: '',
  });

  const email = user?.email || '';

  // -----------------------------
  // STATES
  // -----------------------------

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  // -----------------------------
  // LOAD PROFILE DATA
  // -----------------------------

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const [uRes, pRes] = await Promise.all([
          getProfile(),
          getPatientProfile(),
        ]);

        // USER DATA

        const u = uRes.data;

        setUForm({
          first_name: u.first_name || '',
          last_name: u.last_name || '',
          phone: u.phone || '',
          gender: u.gender || '',
          dob: u.dob || '',
          address: u.address || '',
        });


        // PATIENT DATA

        const p = pRes.data;

        setPForm({
          blood_group: p.blood_group || '',

          height:
            p.height !== null && p.height !== undefined
              ? String(p.height)
              : '',

          weight:
            p.weight !== null && p.weight !== undefined
              ? String(p.weight)
              : '',

          emergency_contact: p.emergency_contact || '',
          allergies: p.allergies || '',
          medical_history: p.medical_history || '',
        });

      } catch (err) {

        console.error(err);

        setError(
          'Could not load profile. Please refresh the page.'
        );

      } finally {

        setFetching(false);

      }

    };

    loadProfile();

  }, []);


  // -----------------------------
  // PERSONAL FORM CHANGE
  // -----------------------------

  const uChange = (e) => {

    setUForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  // -----------------------------
  // HEALTH FORM CHANGE
  // -----------------------------

  const pChange = (e) => {

    setPForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  // -----------------------------
  // SAVE EVERYTHING
  // -----------------------------

  const handleSave = async () => {

    setSaving(true);
    setError('');
    setSuccess(false);

    try {

      // Update User Profile

      await updateProfile(uForm);


      // Update Patient Profile

      await updatePatientProfile({

        blood_group: pForm.blood_group,

        height:
          pForm.height !== ''
            ? parseFloat(pForm.height)
            : null,

        weight:
          pForm.weight !== ''
            ? parseFloat(pForm.weight)
            : null,

        emergency_contact:
          pForm.emergency_contact,

        allergies:
          pForm.allergies,

        medical_history:
          pForm.medical_history,

      });


      // Update Auth Context

      setUser((prev) => ({
        ...prev,
        ...uForm,
      }));


      setSuccess(true);

      toast.success(
        'Profile saved successfully! ✅'
      );

    } catch (err) {

      console.error(err);

      const data = err.response?.data;

      if (data && typeof data === 'object') {

        const messages = Object.entries(data)
          .flatMap(([key, value]) => {

            if (Array.isArray(value)) {

              return value.map(
                (message) =>
                  `${key}: ${message}`
              );

            }

            return [`${key}: ${value}`];

          })
          .join(' | ');

        setError(messages);

      } else {

        setError(
          'Save failed. Please try again.'
        );

      }

    } finally {

      setSaving(false);

    }

  };


  // -----------------------------
  // LOADING SCREEN
  // -----------------------------

  if (fetching) {

    return (

      <Layout>

        <Box
          sx={{
            minHeight: '60vh',
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


  // -----------------------------
  // PROFILE DISPLAY DATA
  // -----------------------------

  const initial =
    (
      uForm.first_name ||
      email ||
      'P'
    )[0].toUpperCase();


  const fullName =
    [
      uForm.first_name,
      uForm.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    email.split('@')[0];


  // -----------------------------
  // MAIN UI
  // -----------------------------

  return (

    <Layout>

      <Box
        sx={{
          width: '100%',
          maxWidth: 1100,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 4 },
        }}
      >


        {/* ========================================= */}
        {/* PROFILE HEADER */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <Card
            sx={{
              mb: 3,
              overflow: 'visible',
              borderRadius: 3,
            }}
          >

            {/* Banner */}

            <Box
              sx={{
                height: {
                  xs: 90,
                  md: 120,
                },

                background:
                  'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)',

                borderRadius:
                  '16px 16px 0 0',
              }}
            />


            <CardContent
              sx={{
                pt: 0,
                px: {
                  xs: 2,
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

                  gap: 2.5,

                  mt: -5,

                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
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
                    width: 90,
                    height: 90,

                    fontSize: 32,
                    fontWeight: 800,

                    background:
                      'linear-gradient(135deg,#0EA5E9,#06B6D4)',

                    border: '4px solid #fff',

                    boxShadow:
                      '0 8px 24px rgba(14,165,233,.3)',

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
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="#0F172A"
                  >

                    {fullName}

                  </Typography>


                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >

                    {email}

                  </Typography>


                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      mt: 1,

                      justifyContent: {
                        xs: 'center',
                        sm: 'flex-start',
                      },

                      flexWrap: 'wrap',
                    }}
                  >

                    <Chip
                      label="Patient"
                      size="small"
                      sx={{
                        bgcolor: '#E0F2FE',
                        color: '#0284C7',
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    />


                    {pForm.blood_group && (

                      <Chip
                        label={`Blood: ${pForm.blood_group}`}
                        size="small"
                        sx={{
                          bgcolor: '#FEE2E2',
                          color: '#DC2626',
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />

                    )}


                    {uForm.gender && (

                      <Chip
                        label={uForm.gender}
                        size="small"
                        sx={{
                          bgcolor: '#F3F4F6',
                          color: '#374151',
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />

                    )}

                  </Box>

                </Box>

              </Box>

            </CardContent>

          </Card>

        </motion.div>


        {/* ========================================= */}
        {/* ERROR / SUCCESS */}
        {/* ========================================= */}

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


        {success && (

          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
            onClose={() => setSuccess(false)}
          >

            Profile updated successfully!

          </Alert>

        )}


        {/* ========================================= */}
        {/* TWO PROFILE CARDS */}
        {/* ========================================= */}

        <Grid
          container
          spacing={3}
          alignItems="stretch"
        >


          {/* ===================================== */}
          {/* PERSONAL INFORMATION */}
          {/* ===================================== */}

          <Grid item xs={12} md={6}>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              style={{
                height: '100%',
              }}
            >

              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                }}
              >

                <CardContent
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3,
                    },
                  }}
                >

                  {/* Heading */}

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
                        width: 40,
                        height: 40,

                        bgcolor: '#E0F2FE',

                        borderRadius: 2,

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

                      <MdPerson
                        size={21}
                        color="#0EA5E9"
                      />

                    </Box>


                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >

                      Personal Information

                    </Typography>

                  </Box>


                  {/* Email */}

                  <TextField
                    fullWidth
                    label="Email Address"
                    value={email}
                    disabled

                    sx={{
                      mb: 2.5,

                      '& .MuiInputBase-input.Mui-disabled':
                        {
                          WebkitTextFillColor:
                            '#64748B',
                        },
                    }}

                    helperText="Email cannot be changed"
                  />


                  {/* First / Last Name */}

                  <Grid
                    container
                    spacing={2}
                  >

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={uForm.first_name}
                        onChange={uChange}
                      />

                    </Grid>


                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={uForm.last_name}
                        onChange={uChange}
                      />

                    </Grid>


                    {/* Phone */}

                    <Grid
                      item
                      xs={12}
                    >

                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={uForm.phone}
                        onChange={uChange}
                        placeholder="+91 98765 43210"
                      />

                    </Grid>


                    {/* Gender */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        select
                        fullWidth
                        label="Gender"
                        name="gender"
                        value={uForm.gender}
                        onChange={uChange}
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

                        <MenuItem value="Prefer not to say">
                          Prefer not to say
                        </MenuItem>

                      </TextField>

                    </Grid>


                    {/* DOB */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={uForm.dob}
                        onChange={uChange}

                        InputLabelProps={{
                          shrink: true,
                        }}

                        inputProps={{
                          max:
                            new Date()
                              .toISOString()
                              .split('T')[0],
                        }}
                      />

                    </Grid>


                    {/* Address */}

                    <Grid
                      item
                      xs={12}
                    >

                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={uForm.address}
                        onChange={uChange}

                        multiline
                        rows={3}

                        placeholder="Your full address"
                      />

                    </Grid>

                  </Grid>

                </CardContent>

              </Card>

            </motion.div>

          </Grid>


          {/* ===================================== */}
          {/* HEALTH INFORMATION */}
          {/* ===================================== */}

          <Grid item xs={12} md={6}>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              style={{
                height: '100%',
              }}
            >

              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                }}
              >

                <CardContent
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3,
                    },
                  }}
                >

                  {/* Heading */}

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
                        width: 40,
                        height: 40,

                        bgcolor: '#FEE2E2',

                        borderRadius: 2,

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

                      <MdFavorite
                        size={21}
                        color="#EF4444"
                      />

                    </Box>


                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >

                      Health Information

                    </Typography>

                  </Box>


                  <Grid
                    container
                    spacing={2}
                  >


                    {/* Blood Group */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        select
                        fullWidth
                        label="Blood Group"
                        name="blood_group"
                        value={pForm.blood_group}
                        onChange={pChange}
                      >

                        <MenuItem value="">
                          Select Blood Group
                        </MenuItem>

                        <MenuItem value="A+">
                          A+
                        </MenuItem>

                        <MenuItem value="A-">
                          A-
                        </MenuItem>

                        <MenuItem value="B+">
                          B+
                        </MenuItem>

                        <MenuItem value="B-">
                          B-
                        </MenuItem>

                        <MenuItem value="AB+">
                          AB+
                        </MenuItem>

                        <MenuItem value="AB-">
                          AB-
                        </MenuItem>

                        <MenuItem value="O+">
                          O+
                        </MenuItem>

                        <MenuItem value="O-">
                          O-
                        </MenuItem>

                      </TextField>

                    </Grid>


                    {/* Height */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        type="number"
                        label="Height (cm)"
                        name="height"
                        value={pForm.height}
                        onChange={pChange}
                        inputProps={{
                          min: 0,
                          step: 0.1,
                        }}
                      />

                    </Grid>


                    {/* Weight */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        type="number"
                        label="Weight (kg)"
                        name="weight"
                        value={pForm.weight}
                        onChange={pChange}
                        inputProps={{
                          min: 0,
                          step: 0.1,
                        }}
                      />

                    </Grid>


                    {/* Emergency Contact */}

                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >

                      <TextField
                        fullWidth
                        label="Emergency Contact"
                        name="emergency_contact"
                        value={pForm.emergency_contact}
                        onChange={pChange}
                        placeholder="+91 98765 43210"
                      />

                    </Grid>


                    {/* Allergies */}

                    <Grid
                      item
                      xs={12}
                    >

                      <TextField
                        fullWidth
                        label="Allergies"
                        name="allergies"
                        value={pForm.allergies}
                        onChange={pChange}
                        multiline
                        rows={3}
                        placeholder="e.g. Penicillin, peanuts, dust..."
                      />

                    </Grid>


                    {/* Medical History */}

                    <Grid
                      item
                      xs={12}
                    >

                      <TextField
                        fullWidth
                        label="Medical History"
                        name="medical_history"
                        value={pForm.medical_history}
                        onChange={pChange}
                        multiline
                        rows={5}
                        placeholder="Enter previous diseases, surgeries, conditions, etc."
                      />

                    </Grid>

                  </Grid>

                </CardContent>

              </Card>

            </motion.div>

          </Grid>

        </Grid>


        {/* ========================================= */}
        {/* SAVE BUTTON */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
        >

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: {
                xs: 'stretch',
                sm: 'flex-end',
              },
            }}
          >

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={saving}

              fullWidth={{
                xs: true,
                sm: false,
              }}

              startIcon={
                saving
                  ? (
                    <CircularProgress
                      size={18}
                      color="inherit"
                    />
                  )
                  : (
                    <MdSave size={20} />
                  )
              }

              sx={{
                minWidth: {
                  xs: '100%',
                  sm: 220,
                },

                py: 1.5,
                px: 4,

                borderRadius: 2.5,

                fontWeight: 700,

                fontSize: '0.95rem',

                boxShadow:
                  '0 8px 24px rgba(14,165,233,.3)',
              }}
            >

              {saving
                ? 'Saving Changes...'
                : 'Save All Changes'}

            </Button>

          </Box>

        </motion.div>

      </Box>

    </Layout>

  );
}