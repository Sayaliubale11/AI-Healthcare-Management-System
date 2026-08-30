import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Box, Button, Typography, Container,
  IconButton, Drawer, List, ListItemButton, ListItemText,
} from '@mui/material';
import { MdLocalHospital, MdMenu, MdClose } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Features',     path: '/features'     },
  { label: 'Doctors',      path: '/doctors-info'  },
  { label: 'How It Works', path: '/how-it-works'  },
  { label: 'Contact',      path: '/contact'       },
];

export default function PublicNavbar({ transparent = false }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated, role } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const goDashboard = () => {
    if (!isAuthenticated) { navigate('/register'); return; }
    if (role === 'DOCTOR') navigate('/doctor/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/patient/dashboard');
  };

  const shouldBeTransparent = transparent && !scrolled;

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{
        bgcolor: shouldBeTransparent ? 'transparent' : 'rgba(255,255,255,.97)',
        backdropFilter: shouldBeTransparent ? 'none' : 'blur(20px)',
        borderBottom: shouldBeTransparent ? 'none' : '1px solid rgba(14,165,233,.1)',
        transition: 'all .35s ease',
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo */}
            <Box onClick={() => navigate('/home')}
              sx={{ display:'flex', alignItems:'center', gap:1.5, cursor:'pointer', flex:1 }}>
              <Box sx={{
                width:38, height:38, borderRadius:2,
                background:'linear-gradient(135deg,#0EA5E9,#06B6D4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 4px 12px rgba(14,165,233,.4)',
              }}>
                <MdLocalHospital size={22} color="#fff" />
              </Box>
              <Typography fontWeight={800} fontSize={20}
                sx={{ background:'linear-gradient(135deg,#0EA5E9,#06B6D4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                MediNova
              </Typography>
            </Box>

            {/* Desktop links */}
            <Box sx={{ display:{ xs:'none', md:'flex' }, gap:0.5, mr:3 }}>
              {NAV_LINKS.map(({ label, path }) => (
                <Button key={path} onClick={() => navigate(path)}
                  sx={{
                    color: location.pathname === path ? '#0EA5E9' : '#475569',
                    fontWeight: location.pathname === path ? 700 : 500,
                    fontSize: 14,
                    borderBottom: location.pathname === path ? '2px solid #0EA5E9' : '2px solid transparent',
                    borderRadius: 0,
                    '&:hover': { color:'#0EA5E9', bgcolor:'transparent' },
                  }}>
                  {label}
                </Button>
              ))}
            </Box>

            {/* Auth buttons */}
            <Box sx={{ display:{ xs:'none', md:'flex' }, gap:1.5 }}>
              {isAuthenticated ? (
                <Button variant="contained" onClick={goDashboard} sx={{ borderRadius:2.5 }}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outlined" onClick={() => navigate('/login')}
                    sx={{ borderColor:'#0EA5E9', color:'#0EA5E9', borderRadius:2.5, fontWeight:600 }}>
                    Sign In
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/register')} sx={{ borderRadius:2.5 }}>
                    Get Started
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile burger */}
            <IconButton sx={{ display:{ md:'none' } }} onClick={() => setMobileOpen(true)}>
              <MdMenu size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx:{ width:280 } }}>
        <Box sx={{ p:2 }}>
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
            <Typography fontWeight={800} fontSize={18} color="#0EA5E9">MediNova</Typography>
            <IconButton onClick={() => setMobileOpen(false)}><MdClose /></IconButton>
          </Box>
          <List>
            {NAV_LINKS.map(({ label, path }) => (
              <ListItemButton key={path}
                onClick={() => { navigate(path); setMobileOpen(false); }}
                sx={{ borderRadius:2, mb:0.5, bgcolor: location.pathname === path ? '#EFF6FF' : 'transparent' }}>
                <ListItemText primary={label}
                  primaryTypographyProps={{ fontWeight: location.pathname === path ? 700 : 400, color: location.pathname === path ? '#0EA5E9' : '#475569' }} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ mt:2, display:'flex', flexDirection:'column', gap:1.5 }}>
            {isAuthenticated ? (
              <Button variant="contained" fullWidth onClick={goDashboard} sx={{ borderRadius:2.5 }}>Dashboard</Button>
            ) : (
              <>
                <Button variant="outlined" fullWidth onClick={() => { setMobileOpen(false); navigate('/login'); }} sx={{ borderRadius:2.5 }}>Sign In</Button>
                <Button variant="contained" fullWidth onClick={() => { setMobileOpen(false); navigate('/register'); }} sx={{ borderRadius:2.5 }}>Get Started</Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Spacer for fixed navbar */}
      {!transparent && <Box sx={{ height: 70 }} />}
    </>
  );
}