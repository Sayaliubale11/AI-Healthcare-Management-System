import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Avatar, Chip, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { MdCalendarToday, MdBiotech, MdPerson, MdAdd, MdCheckCircle, MdAccessTime, MdPending } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

const SS = {
  PENDING:   { bg: '#FEF3C7', color: '#D97706', label: 'Pending'   },
  APPROVED:  { bg: '#D1FAE5', color: '#059669', label: 'Approved'  },
  COMPLETED: { bg: '#DBEAFE', color: '#2563EB', label: 'Completed' },
  REJECTED:  { bg: '#FEE2E2', color: '#DC2626', label: 'Rejected'  },
  CANCELLED: { bg: '#F1F5F9', color: '#64748B', label: 'Cancelled' },
};

function StatCard({ icon: Icon, label, value, color, delay, onClick }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', borderLeft: `4px solid ${color}`, bgcolor: `${color}06`, '&:hover': onClick ? { boxShadow: `0 8px 24px ${color}25`, transform: 'translateY(-3px)' } : {} }}>
        <CardContent sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600} fontSize={12} mb={0.3}>{label}</Typography>
            <Typography variant="h4" fontWeight={800} color={color}>{value}</Typography>
          </Box>
          <Box sx={{ width: 50, height: 50, borderRadius: 2.5, bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={24} color={color} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [apts, setApts]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then((r) => setApts(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming  = apts.filter((a) => ['PENDING','APPROVED'].includes(a.status));
  const completed = apts.filter((a) => a.status === 'COMPLETED');
  const pending   = apts.filter((a) => a.status === 'PENDING');

  const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening'; };

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header Banner */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ mb: 4, p: 3, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)', borderRadius: 4, color: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2,
            boxShadow: '0 8px 32px rgba(14,165,233,.3)' }}>
            <Box>
              <Typography variant="h5" fontWeight={800} mb={0.5}>
                {greeting()}, {user?.first_name || user?.email?.split('@')[0]}! 👋
              </Typography>
              <Typography sx={{ opacity: .9, fontSize: 14 }}>
                {upcoming.length > 0 ? `You have ${upcoming.length} upcoming appointment${upcoming.length > 1 ? 's' : ''}.` : 'No upcoming appointments. Book one today!'}
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<MdAdd />} onClick={() => navigate('/patient/book')}
              sx={{ bgcolor: 'rgba(255,255,255,.2)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,.3)' }, borderRadius: 2.5, fontWeight: 700, backdropFilter: 'blur(10px)' }}>
              Book Appointment
            </Button>
          </Box>
        </motion.div>

        {/* Stats */}
        <Grid container spacing={2.5} mb={4}>
          {[
            { icon: MdCalendarToday, label: 'Upcoming',  value: upcoming.length,  color: '#0EA5E9', delay: .1, onClick: () => navigate('/patient/appointments') },
            { icon: MdPending,       label: 'Pending',   value: pending.length,   color: '#F59E0B', delay: .2 },
            { icon: MdCheckCircle,   label: 'Completed', value: completed.length, color: '#22C55E', delay: .3 },
            { icon: MdAccessTime,    label: 'Total',     value: apts.length,      color: '#8B5CF6', delay: .4 },
          ].map((s) => <Grid item xs={6} md={3} key={s.label}><StatCard {...s} /></Grid>)}
        </Grid>

        <Grid container spacing={3}>
          {/* Appointments */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                    <Typography variant="h6" fontWeight={700}>Recent Appointments</Typography>
                    <Button size="small" onClick={() => navigate('/patient/appointments')} sx={{ color: '#0EA5E9', fontWeight: 600, fontSize: 13 }}>View All →</Button>
                  </Box>
                  {loading ? (
                    <Box sx={{ textAlign: 'center', py: 5 }}><CircularProgress /></Box>
                  ) : apts.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <Box sx={{ width: 72, height: 72, bgcolor: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                        <MdCalendarToday size={36} color="#BAE6FD" />
                      </Box>
                      <Typography color="text.secondary" fontWeight={500} mb={2}>No appointments yet.</Typography>
                      <Button variant="contained" size="small" onClick={() => navigate('/patient/book')}>Book Now</Button>
                    </Box>
                  ) : (
                    apts.slice(0, 5).map((apt, i) => {
                      const ss = SS[apt.status] || SS.PENDING;
                      return (
                        <motion.div key={apt.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .07 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', p: 1.8, mb: 1.5, borderRadius: 2.5, bgcolor: '#FAFBFE', border: '1px solid #F1F5F9', '&:hover': { borderColor: '#0EA5E9', bgcolor: '#F0F9FF', transform: 'translateX(3px)' }, transition: 'all .2s ease' }}>
                            <Avatar sx={{ background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', mr: 2, width: 40, height: 40, fontSize: 12, fontWeight: 700 }}>Dr</Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography fontWeight={700} variant="body2" noWrap>Doctor #{apt.doctor}</Typography>
                              <Typography variant="caption" color="text.secondary">{apt.appointment_date} · {apt.appointment_time?.slice(0,5)}</Typography>
                            </Box>
                            <Chip label={ss.label} size="small" sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700, fontSize: 11 }} />
                          </Box>
                        </motion.div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={2.5}>Quick Actions</Typography>
                  {[
                    { label: 'Book Appointment',   desc: 'Find & schedule a doctor',     icon: MdCalendarToday, color: '#0EA5E9', path: '/patient/book'         },
                    { label: 'AI Symptom Check',   desc: 'Analyze symptoms with AI',     icon: MdBiotech,       color: '#8B5CF6', path: '/patient/ai'           },
                    { label: 'View Appointments',  desc: 'All your appointments',         icon: MdAccessTime,    color: '#14B8A6', path: '/patient/appointments' },
                    { label: 'My Profile',         desc: 'Update health information',     icon: MdPerson,        color: '#F59E0B', path: '/patient/profile'      },
                  ].map(({ label, desc, icon: Icon, color, path }) => (
                    <motion.div key={path} whileHover={{ x: 4 }} transition={{ duration: .15 }}>
                      <Box onClick={() => navigate(path)} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.8, mb: 1.5, borderRadius: 2.5, cursor: 'pointer', border: `1px solid ${color}18`, '&:hover': { bgcolor: `${color}06`, borderColor: `${color}40` }, transition: 'all .2s' }}>
                        <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={20} color={color} />
                        </Box>
                        <Box>
                          <Typography fontWeight={700} variant="body2" color="#0F172A">{label}</Typography>
                          <Typography variant="caption" color="text.secondary">{desc}</Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}