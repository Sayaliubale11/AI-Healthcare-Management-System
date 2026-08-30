import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, CircularProgress, MenuItem, TextField, Avatar, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import { MdCalendarToday, MdAccessTime, MdCancel, MdRefresh } from 'react-icons/md';
import { getAppointments, updateAppointment } from '../../api';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';

const SS = { PENDING:{ bg:'#FEF3C7',color:'#D97706' }, APPROVED:{ bg:'#D1FAE5',color:'#059669' }, COMPLETED:{ bg:'#DBEAFE',color:'#2563EB' }, REJECTED:{ bg:'#FEE2E2',color:'#DC2626' }, CANCELLED:{ bg:'#F1F5F9',color:'#64748B' } };

export default function MyAppointments() {
  const [apts,   setApts]   = useState([]);
  const [loading,setLoading]= useState(true);
  const [filter, setFilter] = useState('ALL');
  const [cancelId,setCancelId]=useState(null);
  const [cancelling,setCancelling]=useState(false);

  const load = () => {
    setLoading(true);
    getAppointments()
      .then((r) => setApts(Array.isArray(r.data) ? r.data : []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const displayed = filter === 'ALL' ? apts : apts.filter((a) => a.status === filter);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await updateAppointment(cancelId, { status: 'CANCELLED' });
      toast.success('Appointment cancelled.');
      setCancelId(null); load();
    } catch { toast.error('Could not cancel.'); }
    finally { setCancelling(false); }
  };

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" fontWeight={800}>My Appointments</Typography>
            <Typography color="text.secondary" variant="body2" fontSize={13}>{apts.length} total · {apts.filter((a) => a.status === 'PENDING').length} pending</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField select value={filter} onChange={(e) => setFilter(e.target.value)} size="small" sx={{ minWidth: 140 }} label="Status">
              {['ALL','PENDING','APPROVED','COMPLETED','CANCELLED','REJECTED'].map((s) => <MenuItem key={s} value={s}>{s === 'ALL' ? 'All Status' : s}</MenuItem>)}
            </TextField>
            <Button variant="outlined" startIcon={<MdRefresh />} onClick={load} size="small">Refresh</Button>
          </Box>
        </Box>

        {loading ? <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress size={48} /></Box>
        : displayed.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 10 }}>
            <Box sx={{ width: 80, height: 80, bgcolor: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <MdCalendarToday size={40} color="#BAE6FD" />
            </Box>
            <Typography color="text.secondary" variant="h6" fontWeight={600}>No appointments found</Typography>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {displayed.map((apt, i) => {
              const ss = SS[apt.status] || SS.PENDING;
              return (
                <Grid item xs={12} md={6} key={apt.id}>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }}>
                    <Card sx={{ border: `1px solid ${ss.color}20` }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', width: 44, height: 44, fontWeight: 700 }}>Dr</Avatar>
                            <Box>
                              <Typography fontWeight={700} variant="body2">Doctor #{apt.doctor}</Typography>
                              <Typography variant="caption" color="text.secondary">Appointment #{apt.id}</Typography>
                            </Box>
                          </Box>
                          <Chip label={apt.status} size="small" sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700 }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .6 }}><MdCalendarToday size={13} color="#0EA5E9" /><Typography variant="body2" fontWeight={600}>{apt.appointment_date}</Typography></Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .6 }}><MdAccessTime size={13} color="#0EA5E9" /><Typography variant="body2" fontWeight={600}>{apt.appointment_time?.slice(0,5)}</Typography></Box>
                        </Box>
                        {apt.symptoms && <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, mb: 1.5, border: '1px solid #E2E8F0' }}><Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={.3}>SYMPTOMS</Typography><Typography variant="body2">{apt.symptoms}</Typography></Box>}
                        {apt.doctor_notes && <Box sx={{ p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, mb: 1.5, border: '1px solid #D1FAE5' }}><Typography variant="caption" color="#059669" fontWeight={700} display="block" mb={.3}>DOCTOR'S NOTES</Typography><Typography variant="body2">{apt.doctor_notes}</Typography></Box>}
                        {['PENDING','APPROVED'].includes(apt.status) && (
                          <Button size="small" color="error" startIcon={<MdCancel />} variant="outlined" fullWidth onClick={() => setCancelId(apt.id)} sx={{ borderRadius: 2, mt: .5 }}>Cancel Appointment</Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Dialog open={!!cancelId} onClose={() => setCancelId(null)}>
          <DialogTitle fontWeight={700}>Cancel Appointment?</DialogTitle>
          <DialogContent><Typography>This action cannot be undone.</Typography></DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCancelId(null)} disabled={cancelling}>Keep It</Button>
            <Button onClick={handleCancel} color="error" variant="contained" disabled={cancelling}>
              {cancelling ? <CircularProgress size={18} color="inherit" /> : 'Yes, Cancel'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}