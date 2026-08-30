import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, CircularProgress, TextField, MenuItem, Grid, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import { MdCalendarToday, MdAccessTime, MdRefresh } from 'react-icons/md';
import { getDoctorAppointments, updateAppointmentStatus } from '../../api';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';

const SS = { PENDING:{bg:'#FEF3C7',color:'#D97706'}, APPROVED:{bg:'#D1FAE5',color:'#059669'}, COMPLETED:{bg:'#DBEAFE',color:'#2563EB'}, REJECTED:{bg:'#FEE2E2',color:'#DC2626'}, CANCELLED:{bg:'#F1F5F9',color:'#64748B'} };

export default function DoctorAppointments() {
  const [apts,setApts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState('ALL');
  const [actionApt,setActionApt]=useState(null);
  const [notes,setNotes]=useState('');
  const [updating,setUpdating]=useState(false);

  const load = () => {
    setLoading(true);
    getDoctorAppointments()
      .then((r) => setApts(Array.isArray(r.data) ? r.data : []))
      .catch(() => toast.error('Failed to load.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const displayed = filter === 'ALL' ? apts : apts.filter((a) => a.status === filter);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateAppointmentStatus(actionApt.apt.id, { status: actionApt.newStatus, doctor_notes: notes });
      toast.success(`Appointment ${actionApt.newStatus.toLowerCase()}.`);
      setActionApt(null); load();
    } catch { toast.error('Update failed.'); }
    finally { setUpdating(false); }
  };

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight={800}>Appointments</Typography>
            <Typography color="text.secondary" variant="body2" fontSize={13}>{apts.length} total · {apts.filter((a) => a.status === 'PENDING').length} pending</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField select value={filter} onChange={(e) => setFilter(e.target.value)} size="small" sx={{ minWidth: 140 }} label="Status">
              {['ALL','PENDING','APPROVED','COMPLETED','REJECTED','CANCELLED'].map((s) => <MenuItem key={s} value={s}>{s === 'ALL' ? 'All Status' : s}</MenuItem>)}
            </TextField>
            <Button variant="outlined" startIcon={<MdRefresh />} onClick={load} size="small">Refresh</Button>
          </Box>
        </Box>

        {loading ? <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress size={48} /></Box>
        : displayed.length === 0 ? <Card sx={{ textAlign: 'center', py: 10 }}><MdCalendarToday size={60} color="#BAE6FD" /><Typography color="text.secondary" mt={2} variant="h6" fontWeight={600}>No appointments found.</Typography></Card>
        : (
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
                            <Avatar sx={{ bgcolor: '#E0F2FE', color: '#0284C7', fontWeight: 700 }}>P</Avatar>
                            <Box><Typography fontWeight={700} variant="body2">Patient #{apt.patient}</Typography><Typography variant="caption" color="text.secondary">ID #{apt.id}</Typography></Box>
                          </Box>
                          <Chip label={apt.status} size="small" sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700 }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .6 }}><MdCalendarToday size={13} color="#0EA5E9" /><Typography variant="body2">{apt.appointment_date}</Typography></Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .6 }}><MdAccessTime size={13} color="#0EA5E9" /><Typography variant="body2">{apt.appointment_time?.slice(0,5)}</Typography></Box>
                        </Box>
                        {apt.symptoms && <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, mb: 2, border: '1px solid #E2E8F0' }}><Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={.3}>PATIENT SYMPTOMS</Typography><Typography variant="body2">{apt.symptoms}</Typography></Box>}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {apt.status === 'PENDING' && <>
                            <Button size="small" variant="contained" color="success" onClick={() => { setActionApt({ apt, newStatus: 'APPROVED' }); setNotes(''); }} sx={{ borderRadius: 2 }}>✓ Approve</Button>
                            <Button size="small" variant="outlined" color="error" onClick={() => { setActionApt({ apt, newStatus: 'REJECTED' }); setNotes(''); }} sx={{ borderRadius: 2 }}>✗ Reject</Button>
                          </>}
                          {apt.status === 'APPROVED' && <Button size="small" variant="contained" onClick={() => { setActionApt({ apt, newStatus: 'COMPLETED' }); setNotes(apt.doctor_notes || ''); }} sx={{ borderRadius: 2, bgcolor: '#8B5CF6', '&:hover': { bgcolor: '#7C3AED' } }}>✓ Mark Completed</Button>}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Dialog open={!!actionApt} onClose={() => setActionApt(null)} maxWidth="sm" fullWidth>
          <DialogTitle fontWeight={700}>
            {actionApt?.newStatus === 'APPROVED'  && '✅ Approve Appointment'}
            {actionApt?.newStatus === 'REJECTED'  && '❌ Reject Appointment'}
            {actionApt?.newStatus === 'COMPLETED' && '🏁 Mark as Completed'}
          </DialogTitle>
          <DialogContent>
            <Typography color="text.secondary" mb={2.5} fontSize={14}>
              {actionApt?.newStatus === 'APPROVED'  && 'Patient will be notified of confirmation.'}
              {actionApt?.newStatus === 'REJECTED'  && 'Patient will be notified of rejection.'}
              {actionApt?.newStatus === 'COMPLETED' && 'Add clinical notes for this appointment.'}
            </Typography>
            <TextField fullWidth label="Doctor Notes (optional)" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Diagnosis, prescription, follow-up instructions…" />
          </DialogContent>
          <DialogActions sx={{ p: 2.5, gap: 1 }}>
            <Button onClick={() => setActionApt(null)} disabled={updating}>Cancel</Button>
            <Button onClick={handleUpdate} variant="contained" disabled={updating} color={actionApt?.newStatus === 'REJECTED' ? 'error' : 'primary'}>
              {updating ? <CircularProgress size={18} color="inherit" /> : `Confirm ${actionApt?.newStatus}`}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}