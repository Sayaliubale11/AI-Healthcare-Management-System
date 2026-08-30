import React, { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, Grid, CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { MdLocalHospital, MdArrowBack, MdPerson, MdMedicalServices } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, loginUser } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate    = useNavigate();
  const { doLogin } = useAuth();
  const [role, setRole]       = useState('PATIENT');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState({ email: '', password: '', confirm_password: '', phone: '' });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email.trim())            { setError('Email is required.');                         return; }
    if (form.password.length < 8)      { setError('Password must be at least 8 characters.');   return; }
    if (form.password !== form.confirm_password) { setError('Passwords do not match.');          return; }
    setLoading(true);
    try {
      // POST /api/accounts/register/ — body: {email, password, confirm_password, role, phone}
      await registerUser({ ...form, role });
      // Auto login
      const res = await loginUser({ email: form.email, password: form.password });
      doLogin(res.data);
      toast.success('Account created! Welcome to HealthCare AI! 🎉');
      navigate(role === 'PATIENT' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (err) {
      const d = err.response?.data;
      if (d && typeof d === 'object') {
        const msgs = Object.entries(d).flatMap(([k, v]) => Array.isArray(v) ? v.map((m) => `${k}: ${m}`) : [`${k}: ${v}`]);
        setError(msgs.join(' | '));
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#EFF6FF 0%,#E0F2FE 50%,#ECFDF5 100%)', p: 2,
    }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
        style={{ width: '100%', maxWidth: 520 }}>

        <Button startIcon={<MdArrowBack />} onClick={() => navigate('/home')} size="small"
          sx={{ mb: 2, color: '#64748B', '&:hover': { bgcolor: '#F0F9FF', color: '#0EA5E9' } }}>
          Back to Home
        </Button>

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 50, height: 50, borderRadius: 2.5, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(14,165,233,.4)' }}>
            <MdLocalHospital size={26} color="#fff" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0F172A">Create Account</Typography>
            <Typography variant="body2" color="text.secondary">Join HealthCare AI today</Typography>
          </Box>
        </Box>

        <Card elevation={0} sx={{ borderRadius: 4, boxShadow: '0 20px 60px rgba(14,165,233,.1)', border: '1px solid #BAE6FD' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Role selector */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3, p: 0.6, bgcolor: '#F0F9FF', borderRadius: 3 }}>
              {[
                { r: 'PATIENT', label: 'Patient',  icon: MdPerson },
                { r: 'DOCTOR',  label: 'Doctor',   icon: MdMedicalServices },
              ].map(({ r, label, icon: Icon }) => (
                <Box key={r} onClick={() => { setRole(r); setError(''); }}
                  sx={{
                    flex: 1, py: 1.3, borderRadius: 2.5, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 1, cursor: 'pointer', transition: 'all .2s ease',
                    bgcolor: role === r ? '#fff' : 'transparent',
                    boxShadow: role === r ? '0 2px 10px rgba(14,165,233,.15)' : 'none',
                    color: role === r ? '#0EA5E9' : '#64748B',
                  }}>
                  <Icon size={18} />
                  <Typography fontSize={14} fontWeight={role === r ? 700 : 500}>{label}</Typography>
                </Box>
              ))}
            </Box>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>
              </motion.div>
            )}

            <Box component="form" onSubmit={onSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email Address *" name="email" type="email"
                    value={form.email} onChange={onChange} required autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={onChange}
                    placeholder="+91 98765 43210" helperText="Optional" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password *" name="password" type="password"
                    value={form.password} onChange={onChange} required helperText="Min 8 characters" autoComplete="new-password" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Confirm Password *" name="confirm_password" type="password"
                    value={form.confirm_password} onChange={onChange} required autoComplete="new-password" />
                </Grid>
              </Grid>

              {role === 'DOCTOR' && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #BAE6FD' }}>
                  <Typography variant="caption" color="#0284C7" fontWeight={600}>
                    ℹ️ A basic doctor profile is auto-created. Update specialization, hospital, and fee from your Profile page after login.
                  </Typography>
                </Box>
              )}

              <motion.div whileTap={{ scale: .98 }}>
                <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}
                  sx={{ mt: 3, py: 1.7, fontSize: '1rem', borderRadius: 2.5, fontWeight: 700 }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : `Create ${role === 'PATIENT' ? 'Patient' : 'Doctor'} Account`}
                </Button>
              </motion.div>
            </Box>

            <Typography variant="body2" textAlign="center" color="text.secondary" mt={3}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#0EA5E9', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}