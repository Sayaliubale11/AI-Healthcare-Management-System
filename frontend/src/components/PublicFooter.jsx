import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { MdLocalHospital, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicFooter() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const quickLinks = [
    { label: 'Home',         path: '/home' },
    { label: 'Features',     path: '/features' },
    { label: 'Our Doctors',  path: '/doctors-info' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Contact',      path: '/contact' },
    { label: 'Login',        path: '/login' },
    { label: 'Register',     path: '/register' },
  ];

  const services = [
    { label: 'Book Appointment', path: isAuthenticated ? '/patient/book'  : '/register' },
    { label: 'AI Diagnosis',     path: isAuthenticated ? '/patient/ai'    : '/register' },
    { label: 'Find Doctors',     path: '/doctors-info' },
    { label: 'Patient Dashboard',path: isAuthenticated ? '/patient/dashboard' : '/register' },
  ];

  const contacts = [
    { icon: MdPhone,       text: '+91 98765 43210' },
    { icon: MdEmail,       text: 'support@medinova.ai' },
    { icon: MdLocationOn,  text: 'Mumbai, Maharashtra, India' },
  ];

  return (
    <Box id="footer" sx={{ bgcolor: '#abe8f5', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} mb={6}>

          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:2.5 }}>
              <Box sx={{
                width:40, height:40, borderRadius:2,
                background:'linear-gradient(135deg,#0EA5E9,#06B6D4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>
                <MdLocalHospital size={22} color="#fff" />
              </Box>
              <Typography fontWeight={800} color="#fff" fontSize={20}>MediNova</Typography>
            </Box>
            <Typography color="#94A3B8" fontSize={14} lineHeight={1.9} mb={3.5}>
              AI-powered healthcare platform connecting patients with expert doctors across India. 
              Book appointments, check symptoms with AI, and manage your health.
            </Typography>

            {/* Contact info */}
            {contacts.map(({ icon: Icon, text }) => (
              <Box key={text} sx={{ display:'flex', alignItems:'center', gap:1.5, mb:1.8 }}>
                <Box sx={{ flexShrink:0, width:20, display:'flex', justifyContent:'center' }}>
                  <Icon size={16} color="#0EA5E9" />
                </Box>
                <Typography color="#94A3B8" fontSize={14}>{text}</Typography>
              </Box>
            ))}
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} color="#fff" mb={2.5} fontSize={15}>
              Quick Links
            </Typography>
            {quickLinks.map(({ label, path }) => (
              <Typography key={label}
                onClick={() => navigate(path)}
                color="#94A3B8" fontSize={14} mb={1.5}
                sx={{ cursor:'pointer', display:'block', '&:hover':{ color:'#0EA5E9' }, transition:'color .2s' }}>
                {label}
              </Typography>
            ))}
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} color="#fff" mb={2.5} fontSize={15}>
              Services
            </Typography>
            {services.map(({ label, path }) => (
              <Typography key={label}
                onClick={() => navigate(path)}
                color="#94A3B8" fontSize={14} mb={1.5}
                sx={{ cursor:'pointer', display:'block', '&:hover':{ color:'#0EA5E9' }, transition:'color .2s' }}>
                {label}
              </Typography>
            ))}
          </Grid>

          {/* For Patients */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} color="#fff" mb={2.5} fontSize={15}>
              For Patients
            </Typography>
            {[
              'Register as Patient',
              'Book Appointments',
              'AI Symptom Check',
              'View Medical History',
              'Emergency Contact',
            ].map((t) => (
              <Typography key={t}
                onClick={() => navigate(isAuthenticated ? '/patient/dashboard' : '/register')}
                color="#94A3B8" fontSize={14} mb={1.5}
                sx={{ cursor:'pointer', display:'block', '&:hover':{ color:'#0EA5E9' }, transition:'color .2s' }}>
                {t}
              </Typography>
            ))}
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box sx={{ borderTop:'1px solid #1E293B', pt:4 }}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item xs={12} md="auto">
              <Typography color="#64748B" fontSize={13}>
                © 2024 MediNova. All rights reserved. Made with ❤️ for better healthcare.
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Box sx={{ display:'flex', gap:3 }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
                  <Typography key={t} color="#64748B" fontSize={13}
                    sx={{ cursor:'pointer', '&:hover':{ color:'#0EA5E9' }, transition:'color .2s' }}>
                    {t}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}