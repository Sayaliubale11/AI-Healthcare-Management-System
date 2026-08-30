import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { MdPeople, MdCalendarToday, MdMedicalServices, MdCheckCircle } from 'react-icons/md';
import { getAppointments, getDoctors } from '../../api';
import Layout from '../../components/Layout';

export default function AdminDashboard() {
  const [apts,setApts]=useState([]);
  const [doctors,setDoctors]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    Promise.all([getAppointments(), getDoctors()])
      .then(([a,d]) => { setApts(Array.isArray(a.data)?a.data:[]); setDoctors(Array.isArray(d.data)?d.data:[]); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: MdCalendarToday,  label: 'Total Appointments', value: apts.length,                                     color: '#0EA5E9' },
    { icon: MdMedicalServices,label: 'Active Doctors',     value: doctors.filter((d) => d.available).length,       color: '#22C55E' },
    { icon: MdPeople,         label: 'Pending',            value: apts.filter((a) => a.status==='PENDING').length,  color: '#F59E0B' },
    { icon: MdCheckCircle,    label: 'Completed',          value: apts.filter((a) => a.status==='COMPLETED').length,color: '#8B5CF6' },
  ];

  if (loading) return <Layout><Box sx={{ textAlign:'center',py:10 }}><CircularProgress size={48} /></Box></Layout>;

  return (
    <Layout>
      <Box sx={{ p: { xs:2, md:3 } }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
          <Box sx={{ mb:4, p:3, background:'linear-gradient(135deg,#0EA5E9,#06B6D4)', borderRadius:4, color:'#fff', boxShadow:'0 8px 32px rgba(14,165,233,.3)' }}>
            <Typography variant="h5" fontWeight={800}>Admin Dashboard 🛡️</Typography>
            <Typography sx={{ opacity:.9, mt:.5, fontSize:14 }}>System overview and management.</Typography>
          </Box>
        </motion.div>

        <Grid container spacing={2.5} mb={4}>
          {stats.map(({icon:Icon,label,value,color},i) => (
            <Grid item xs={6} md={3} key={label}>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*.1 }}>
                <Card sx={{ borderLeft:`4px solid ${color}`, bgcolor:`${color}06` }}>
                  <CardContent sx={{ p:2.5, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <Box><Typography variant="body2" color="text.secondary" fontWeight={600} fontSize={12}>{label}</Typography><Typography variant="h4" fontWeight={800} color={color} mt={.3}>{value}</Typography></Box>
                    <Box sx={{ width:50,height:50,borderRadius:2.5,bgcolor:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center' }}><Icon size={24} color={color} /></Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p:3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Doctors Overview</Typography>
                {doctors.slice(0,6).map((doc) => (
                  <Box key={doc.id} sx={{ display:'flex',alignItems:'center',gap:2,py:1.5,borderBottom:'1px solid #F1F5F9' }}>
                    <Box sx={{ width:38,height:38,borderRadius:2,bgcolor:'#E0F2FE',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#0284C7',fontSize:12,flexShrink:0 }}>Dr</Box>
                    <Box sx={{ flex:1,minWidth:0 }}>
                      <Typography variant="body2" fontWeight={700} noWrap>{doc.doctor_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{doc.specialization}</Typography>
                    </Box>
                    <Chip label={doc.available?'Available':'Busy'} size="small" sx={{ bgcolor:doc.available?'#D1FAE5':'#FEE2E2',color:doc.available?'#059669':'#DC2626',fontWeight:700,fontSize:11 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p:3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Recent Appointments</Typography>
                {apts.slice(0,6).map((apt) => {
                  const colors={PENDING:'#F59E0B',APPROVED:'#22C55E',COMPLETED:'#0EA5E9',REJECTED:'#EF4444',CANCELLED:'#94A3B8'};
                  return (
                    <Box key={apt.id} sx={{ display:'flex',alignItems:'center',gap:2,py:1.5,borderBottom:'1px solid #F1F5F9' }}>
                      <Box sx={{ flex:1,minWidth:0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>Patient #{apt.patient} → Doctor #{apt.doctor}</Typography>
                        <Typography variant="caption" color="text.secondary">{apt.appointment_date} at {apt.appointment_time?.slice(0,5)}</Typography>
                      </Box>
                      <Typography variant="caption" fontWeight={800} color={colors[apt.status]||'#94A3B8'} sx={{ flexShrink:0 }}>{apt.status}</Typography>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}