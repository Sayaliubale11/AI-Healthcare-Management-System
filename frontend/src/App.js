import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing            from './pages/Landing';
import FeaturesPage       from './pages/public/FeaturesPage';
import DoctorsPage        from './pages/public/DoctorsPage';
import HowItWorksPage     from './pages/public/HowItWorksPage';
import ContactPage        from './pages/public/ContactPage';
import Login              from './pages/auth/Login';
import Register           from './pages/auth/Register';
import PatientDashboard   from './pages/patient/PatientDashboard';
import BookAppointment    from './pages/patient/BookAppointment';
import MyAppointments     from './pages/patient/MyAppointments';
import PatientProfile     from './pages/patient/PatientProfile';
import AiChecker          from './pages/patient/AiChecker';
import DoctorDashboard    from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile      from './pages/doctor/DoctorProfile';
import AdminDashboard     from './pages/admin/AdminDashboard';

const theme = createTheme({
  palette: {
    primary:    { main: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
    secondary:  { main: '#06B6D4' },
    success:    { main: '#22C55E' },
    warning:    { main: '#F59E0B' },
    error:      { main: '#EF4444' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text:       { primary: '#0F172A', secondary: '#64748B' },
  },
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica Neue",sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, boxShadow: 'none', fontWeight: 600 },
        containedPrimary: {
          background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
          '&:hover': {
            background: 'linear-gradient(135deg,#0284C7,#0891B2)',
            boxShadow: '0 4px 20px rgba(14,165,233,.35)',
            transform: 'translateY(-1px)',
          },
          transition: 'all .25s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(0,0,0,.05)',
          border: '1px solid rgba(226,232,240,.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#0EA5E9' },
            '&.Mui-focused fieldset': { borderColor: '#0EA5E9', borderWidth: 2 },
          },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } } },
  },
});

function Loading() {
  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', bgcolor:'#F8FAFC' }}>
      <CircularProgress size={48} />
    </Box>
  );
}

function Guard({ children, roles }) {
  const { isAuthenticated, role, loading } = useAuth();
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/home" replace />;
  return children;
}

function AppRoutes() {
  const { isAuthenticated, role, loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={
        isAuthenticated
          ? (role === 'DOCTOR' ? <Navigate to="/doctor/dashboard" replace />
            : role === 'ADMIN'  ? <Navigate to="/admin/dashboard"  replace />
            :                     <Navigate to="/patient/dashboard" replace />)
          : <Navigate to="/home" replace />
      } />

      {/* Public pages — ALL accessible even when logged in */}
      <Route path="/home"         element={<Landing />} />
      <Route path="/features"     element={<FeaturesPage />} />
      <Route path="/doctors-info" element={<DoctorsPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/contact"      element={<ContactPage />} />
      <Route path="/login"        element={<Login />} />
      <Route path="/register"     element={<Register />} />

      {/* Patient */}
      <Route path="/patient/dashboard"    element={<Guard roles={['PATIENT']}><PatientDashboard /></Guard>} />
      <Route path="/patient/book"         element={<Guard roles={['PATIENT']}><BookAppointment /></Guard>} />
      <Route path="/patient/appointments" element={<Guard roles={['PATIENT']}><MyAppointments /></Guard>} />
      <Route path="/patient/profile"      element={<Guard roles={['PATIENT']}><PatientProfile /></Guard>} />
      <Route path="/patient/ai"           element={<Guard roles={['PATIENT']}><AiChecker /></Guard>} />

      {/* Doctor */}
      <Route path="/doctor/dashboard"    element={<Guard roles={['DOCTOR']}><DoctorDashboard /></Guard>} />
      <Route path="/doctor/appointments" element={<Guard roles={['DOCTOR']}><DoctorAppointments /></Guard>} />
      <Route path="/doctor/profile"      element={<Guard roles={['DOCTOR']}><DoctorProfile /></Guard>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<Guard roles={['ADMIN']}><AdminDashboard /></Guard>} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={4000} theme="colored" />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}