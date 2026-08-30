import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary:    { main: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
    secondary:  { main: '#06B6D4' },
    success:    { main: '#22C55E' },
    warning:    { main: '#F59E0B' },
    error:      { main: '#EF4444' },
    background: { default: '#F0F9FF', paper: '#FFFFFF' },
    text:       { primary: '#0F172A', secondary: '#475569' },
  },
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica Neue",sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: '10px 24px', boxShadow: 'none' },
        containedPrimary: {
          background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
          '&:hover': {
            background: 'linear-gradient(135deg,#0284C7,#0891B2)',
            boxShadow: '0 4px 20px rgba(14,165,233,0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(226,232,240,0.8)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#0EA5E9' },
            '&.Mui-focused fieldset': { borderColor: '#0EA5E9' },
          },
        },
      },
    },
  },
});