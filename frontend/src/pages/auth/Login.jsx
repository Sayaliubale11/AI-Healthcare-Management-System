import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography,
  Alert, InputAdornment, IconButton, CircularProgress,
} from '@mui/material';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdLocalHospital, MdArrowBack } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate    = useNavigate();
  const { doLogin } = useAuth();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim())    { setError('Email is required.');    return; }
    if (!form.password.trim()) { setError('Password is required.'); return; }
    setError(''); setLoading(true);
    try {
      const res  = await loginUser(form);
      const data = res.data;
      doLogin(data);
      toast.success('Welcome back! 🎉');
      if (data.role === 'DOCTOR') navigate('/doctor/dashboard');
      else if (data.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Invalid email or password. Please try again.'
      );
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg,#EFF6FF 0%,#E0F2FE 50%,#ECFDF5 100%)',
    }}>
      {/* Left decorative panel */}
      <Box sx={{
        display: { xs: 'none', lg: 'flex' }, flex: 1, flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)',
        p: 6, position: 'relative', overflow: 'hidden',
      }}>
        {[240,160,100].map((s, i) => (
          <Box key={i} sx={{ position: 'absolute', width: s*2, height: s*2, borderRadius: '50%', border: '1px solid rgba(255,255,255,.15)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Box sx={{ width: 90, height: 90, bgcolor: 'rgba(255,255,255,.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <MdLocalHospital size={48} color="#fff" />
          </Box>
          <Typography variant="h3" fontWeight={900} color="#fff" mb={2}>HealthCare AI</Typography>
          <Typography color="rgba(255,255,255,.85)" fontSize="1.05rem" lineHeight={1.8} sx={{ maxWidth: 320, mx: 'auto' }}>
            Your intelligent healthcare companion — connecting patients with expert doctors.
          </Typography>
          <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
            {['Book appointments in seconds', 'AI-powered symptom analysis', '500+ verified specialists', 'Secure health records'].map((t) => (
              <Box key={t} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 22, height: 22, bgcolor: 'rgba(255,255,255,.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography color="#fff" fontSize={12} fontWeight={800}>✓</Typography>
                </Box>
                <Typography color="rgba(255,255,255,.9)" fontWeight={500}>{t}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* Right form panel */}
      <Box sx={{ flex: { xs: 1, lg: '0 0 480px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 }, bgcolor: '#fff' }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} style={{ width: '100%', maxWidth: 400 }}>
          <Button startIcon={<MdArrowBack />} onClick={() => navigate('/home')} size="small"
            sx={{ mb: 3, color: '#64748B', '&:hover': { bgcolor: '#F0F9FF', color: '#0EA5E9' } }}>
            Back to Home
          </Button>

          <Typography variant="h4" fontWeight={800} color="#0F172A" mb={0.5}>Welcome back 👋</Typography>
          <Typography color="text.secondary" mb={4}>Sign in to your HealthCare AI account</Typography>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>{error}</Alert>
            </motion.div>
          )}

          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField fullWidth label="Email Address" name="email" type="email"
              value={form.email} onChange={onChange} required sx={{ mb: 2.5 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdEmail color="#0EA5E9" size={20} /></InputAdornment> }}
            />
            <TextField fullWidth label="Password" name="password"
              type={showPw ? 'text' : 'password'}
              value={form.password} onChange={onChange} required sx={{ mb: 3.5 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><MdLock color="#0EA5E9" size={20} /></InputAdornment>,
                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw((p) => !p)} edge="end" size="small">{showPw ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}</IconButton></InputAdornment>,
              }}
            />
            <motion.div whileTap={{ scale: .98 }}>
              <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}
                sx={{ py: 1.7, fontSize: '1rem', borderRadius: 2.5, fontWeight: 700, mb: 2.5 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </motion.div>
          </Box>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0EA5E9', fontWeight: 700, textDecoration: 'none' }}>Create account</Link>
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}