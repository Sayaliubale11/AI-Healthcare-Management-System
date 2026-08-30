import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, AppBar, Toolbar, Typography, IconButton,
  Avatar, Divider, Badge, Tooltip,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MdDashboard, MdCalendarToday, MdPerson, MdBiotech,
  MdLogout, MdMenu, MdLocalHospital, MdPeople,
  MdBarChart, MdSchedule, MdMedicalServices, MdNotifications, MdHome,
} from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const W = 256;

const NAV = {
  PATIENT: [
    { label: 'Dashboard',        icon: MdDashboard,     path: '/patient/dashboard',   color: '#0EA5E9' },
    { label: 'Book Appointment', icon: MdCalendarToday, path: '/patient/book',         color: '#8B5CF6' },
    { label: 'My Appointments',  icon: MdSchedule,      path: '/patient/appointments', color: '#14B8A6' },
    { label: 'AI Symptom Check', icon: MdBiotech,       path: '/patient/ai',           color: '#F59E0B' },
    { label: 'My Profile',       icon: MdPerson,        path: '/patient/profile',      color: '#22C55E' },
  ],
  DOCTOR: [
    { label: 'Dashboard',     icon: MdDashboard,     path: '/doctor/dashboard',    color: '#0EA5E9' },
    { label: 'Appointments',  icon: MdCalendarToday, path: '/doctor/appointments', color: '#8B5CF6' },
    { label: 'My Profile',    icon: MdPerson,        path: '/doctor/profile',      color: '#22C55E' },
  ],
  ADMIN: [
    { label: 'Dashboard', icon: MdDashboard,       path: '/admin/dashboard', color: '#0EA5E9' },
    { label: 'Doctors',   icon: MdMedicalServices, path: '/admin/doctors',   color: '#8B5CF6' },
    { label: 'Patients',  icon: MdPeople,          path: '/admin/patients',  color: '#14B8A6' },
    { label: 'Analytics', icon: MdBarChart,        path: '/admin/analytics', color: '#F59E0B' },
  ],
};

function Sidebar({ onNav }) {
  const { user, role, doLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const items    = NAV[role] || [];
  const initial  = (user?.first_name || user?.email || '?')[0].toUpperCase();

  const handleLogout = () => { doLogout(); toast.info('Logged out.'); navigate('/home'); };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff', overflow: 'hidden' }}>
      {/* Logo — replace the existing logo Box */}
<Box sx={{ p: '18px 20px', background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
  <Box sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,.2)', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <MdLocalHospital size={20} color="#fff" />
  </Box>
  <Box>
    <Typography fontWeight={800} color="#fff" lineHeight={1.2} fontSize={16}>MediNova</Typography>
    <Typography fontSize={10} color="rgba(255,255,255,.7)" lineHeight={1}>AI Healthcare</Typography>
  </Box>
</Box>

      {/* User */}
      <Box sx={{ p: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, background: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)', border: '1px solid #BAE6FD' }}>
          <Avatar sx={{ width: 38, height: 38, fontSize: 14, fontWeight: 800, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', flexShrink: 0 }}>
            {initial}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" fontWeight={700} noWrap color="#0F172A" fontSize={13}>
              {user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user?.email?.split('@')[0]}
            </Typography>
            <Typography fontSize={10} fontWeight={700} color="#0284C7">{role}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav */}
      <List sx={{ flex: 1, px: 1.5, py: 1.5, overflowY: 'auto' }}>
        {/* Home link */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton onClick={() => { navigate('/home'); onNav?.(); }}
            sx={{ borderRadius: 2.5, py: 1, px: 1.5, '&:hover': { bgcolor: '#F0F9FF' }, transition: 'all .2s' }}>
            <ListItemIcon sx={{ minWidth: 34 }}><Box sx={{ width: 30, height: 30, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MdHome size={18} color="#94A3B8" /></Box></ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontSize: 13.5, fontWeight: 400, color: '#475569' }} />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1, borderColor: '#F1F5F9' }} />

        {items.map(({ label, icon: Icon, path, color }) => {
          const active = location.pathname === path;
          return (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton onClick={() => { navigate(path); onNav?.(); }}
                sx={{
                  borderRadius: 2.5, py: 1.1, px: 1.5,
                  bgcolor: active ? `${color}10` : 'transparent',
                  borderLeft: `3px solid ${active ? color : 'transparent'}`,
                  '&:hover': { bgcolor: `${color}08`, borderLeftColor: color },
                  transition: 'all .2s',
                }}>
                <ListItemIcon sx={{ minWidth: 34 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: 1.5, bgcolor: active ? `${color}15` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                    <Icon size={18} color={active ? color : '#94A3B8'} />
                  </Box>
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: 13.5, fontWeight: active ? 700 : 400, color: active ? color : '#475569' }} />
                {active && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#F1F5F9' }} />
      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2.5, py: 1.1, px: 1.5, '&:hover': { bgcolor: '#FEF2F2' }, transition: 'all .2s' }}>
          <ListItemIcon sx={{ minWidth: 34 }}><Box sx={{ width: 30, height: 30, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MdLogout size={18} color="#EF4444" /></Box></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 13.5, fontWeight: 600, color: '#EF4444' }} />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export default function Layout({ children }) {
  const [open, setOpen]  = useState(false);
  const location         = useLocation();
  const { user }         = useAuth();
  const navigate         = useNavigate();
  const initial          = (user?.first_name || user?.email || '?')[0].toUpperCase();
  const allItems         = Object.values(NAV).flat();
  const pageTitle        = allItems.find((n) => n.path === location.pathname)?.label || 'Dashboard';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>

      {/* Desktop Drawer */}
      <Drawer variant="permanent"
        sx={{ width: W, flexShrink: 0, display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: W, border: 'none', boxShadow: '4px 0 20px rgba(14,165,233,.07)', overflow: 'hidden' } }}
        open>
        <Sidebar />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: W, border: 'none' } }}>
        <Sidebar onNav={() => setOpen(false)} />
      </Drawer>

      {/* Main */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* TopBar */}
        <AppBar position="sticky" elevation={0}
          sx={{ bgcolor: 'rgba(248,250,252,.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(186,230,253,.5)', color: '#0F172A', zIndex: 99 }}>
          <Toolbar sx={{ gap: 2, minHeight: '64px !important' }}>
            <IconButton onClick={() => setOpen(true)} sx={{ display: { md: 'none' }, color: '#0F172A' }}>
              <MdMenu size={22} />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} color="#0F172A" fontSize={16}>{pageTitle}</Typography>
              <Typography variant="caption" color="text.secondary" fontSize={11}>AI-Powered Healthcare System</Typography>
            </Box>
            <Tooltip title="Notifications">
              <IconButton sx={{ color: '#64748B' }}>
                <Badge badgeContent={2} color="error"><MdNotifications size={22} /></Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Go to Home">
              <IconButton onClick={() => navigate('/home')} sx={{ color: '#64748B' }}>
                <MdHome size={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <Avatar onClick={() => navigate(`/${(user?.role || 'PATIENT').toLowerCase()}/profile`)}
                sx={{ width: 34, height: 34, cursor: 'pointer', fontSize: 13, fontWeight: 800, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
                  '&:hover': { boxShadow: '0 0 0 3px rgba(14,165,233,.3)' }, transition: 'all .2s' }}>
                {initial}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22, ease: 'easeOut' }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}