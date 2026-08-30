import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, TextField, Chip, CircularProgress, Alert, Avatar, Stepper, Step, StepLabel, MenuItem } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearch, MdStar, MdLocalHospital, MdCheckCircle, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDoctors, getDoctorSlots, createAppointment } from '../../api';
import Layout from '../../components/Layout';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(0);
  const [doctors, setDoctors]   = useState([]);
  const [slots, setSlots]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking]   = useState(false);
  const [error, setError]       = useState('');
  const [done, setDone]         = useState(false);
  const [search, setSearch]     = useState('');
  const [specFilter, setSpecFilter] = useState('All');
  const [chosen, setChosen]     = useState({ doctor: null, date: '', slot: '', symptoms: '' });

  useEffect(() => {
    getDoctors()
      .then((r) => setDoctors(Array.isArray(r.data) ? r.data : []))
      .catch(() => toast.error('Could not load doctors.'))
      .finally(() => setLoading(false));
  }, []);

  const SPECS = ['All', ...new Set(doctors.map((d) => d.specialization).filter(Boolean))];

  const filtered = doctors.filter((d) => {
    const q = search.toLowerCase();
    return (!q || d.doctor_name?.toLowerCase().includes(q) || d.specialization?.toLowerCase().includes(q) || d.hospital?.toLowerCase().includes(q))
        && (specFilter === 'All' || d.specialization === specFilter);
  });

  const handleDateChange = async (date) => {
    setChosen((p) => ({ ...p, date, slot: '' }));
    if (!date || !chosen.doctor) return;
    setSlotsLoading(true);
    try {
      const res = await getDoctorSlots(chosen.doctor.id, date);
      setSlots(Array.isArray(res.data) ? res.data : []);
    } catch { setSlots([]); }
    finally { setSlotsLoading(false); }
  };

  const handleBook = async () => {
    if (!chosen.symptoms.trim()) { setError('Please describe your symptoms.'); return; }
    setBooking(true); setError('');
    try {
      await createAppointment({ doctor: chosen.doctor.id, appointment_date: chosen.date, appointment_time: chosen.slot, symptoms: chosen.symptoms });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || 'Booking failed.');
    } finally { setBooking(false); }
  };

  if (done) return (
    <Layout>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <motion.div initial={{ scale: .5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: .5 }}>
          <Card sx={{ p: 5, textAlign: 'center', maxWidth: 440, borderRadius: 4 }}>
            <motion.div animate={{ scale: [1,1.15,1] }} transition={{ delay: .3, duration: .5 }}>
              <MdCheckCircle size={80} color="#22C55E" />
            </motion.div>
            <Typography variant="h5" fontWeight={800} mt={2} mb={1}>Appointment Booked! 🎉</Typography>
            <Typography color="text.secondary" mb={0.5}><strong>{chosen.doctor?.doctor_name}</strong></Typography>
            <Typography color="text.secondary" mb={2}>{chosen.date} at {chosen.slot}</Typography>
            <Chip label="Status: PENDING — Awaiting confirmation" sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 600, mb: 3 }} />
            <Grid container spacing={1.5}>
              <Grid item xs={6}><Button variant="contained" fullWidth onClick={() => navigate('/patient/appointments')}>View Appointments</Button></Grid>
              <Grid item xs={6}><Button variant="outlined" fullWidth onClick={() => { setDone(false); setStep(0); setChosen({ doctor: null, date: '', slot: '', symptoms: '' }); }}>Book Another</Button></Grid>
            </Grid>
          </Card>
        </motion.div>
      </Box>
    </Layout>
  );

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" fontWeight={800} mb={0.5}>Book Appointment</Typography>
        <Typography color="text.secondary" mb={3} fontSize={14}>Find the right doctor and schedule your visit in 3 easy steps.</Typography>
        <Stepper activeStep={step} sx={{ mb: 4, maxWidth: 500 }}>
          {['Choose Doctor','Pick Date & Time','Confirm'].map((l) => <Step key={l}><StepLabel>{l}</StepLabel></Step>)}
        </Stepper>

        <AnimatePresence mode="wait">
          {/* STEP 0 */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={7}>
                  <TextField fullWidth placeholder="Search doctor, specialization, hospital…" value={search} onChange={(e) => setSearch(e.target.value)} size="small"
                    InputProps={{ startAdornment: <MdSearch color="#94A3B8" style={{ marginRight: 8, flexShrink: 0 }} /> }} />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField select fullWidth label="Specialization" value={specFilter} onChange={(e) => setSpecFilter(e.target.value)} size="small">
                    {SPECS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
              {loading ? <Box sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Box> : (
                <Grid container spacing={2.5}>
                  {filtered.map((doc, i) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }} whileHover={{ y: -4 }}>
                        <Card sx={{ cursor: 'pointer', border: '1px solid #E2E8F0', '&:hover': { borderColor: '#0EA5E9', boxShadow: '0 8px 32px rgba(14,165,233,.18)' } }}
                          onClick={() => { setChosen((p) => ({ ...p, doctor: doc })); setStep(1); }}>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Avatar sx={{ width: 50, height: 50, fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)' }}>
                                {doc.doctor_name?.[0]?.toUpperCase() || 'D'}
                              </Avatar>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography fontWeight={700} variant="body2" noWrap>{doc.doctor_name}</Typography>
                                <Chip label={doc.specialization} size="small" sx={{ bgcolor: '#E0F2FE', color: '#0284C7', fontSize: 10, mt: .3, fontWeight: 600 }} />
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={.5} fontSize={12}>{doc.qualification}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mb: .5 }}>
                              <MdLocalHospital size={12} color="#94A3B8" />
                              <Typography variant="caption" color="text.secondary" noWrap>{doc.hospital}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
                              <Typography fontWeight={800} color="#0EA5E9">₹{doc.consultation_fee}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: .4 }}>
                                <MdStar color="#F59E0B" size={14} />
                                <Typography variant="caption" fontWeight={700}>{doc.experience} yrs</Typography>
                              </Box>
                            </Box>
                            <Button variant="contained" fullWidth size="small" sx={{ mt: 2, borderRadius: 2 }} endIcon={<MdArrowForward />}>Select</Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                  {filtered.length === 0 && <Grid item xs={12}><Box sx={{ textAlign: 'center', py: 8 }}><Typography color="text.secondary">No doctors found.</Typography></Box></Grid>}
                </Grid>
              )}
            </motion.div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardContent sx={{ p: 3.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#F0F9FF', borderRadius: 2.5, mb: 3, border: '1px solid #BAE6FD' }}>
                        <Avatar sx={{ background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)' }}>{chosen.doctor?.doctor_name?.[0]}</Avatar>
                        <Box>
                          <Typography fontWeight={700}>{chosen.doctor?.doctor_name}</Typography>
                          <Typography variant="caption" color="text.secondary">{chosen.doctor?.specialization} · ₹{chosen.doctor?.consultation_fee}</Typography>
                        </Box>
                      </Box>
                      <TextField fullWidth label="Select Date" type="date" value={chosen.date} onChange={(e) => handleDateChange(e.target.value)}
                        InputLabelProps={{ shrink: true }} inputProps={{ min: new Date().toISOString().split('T')[0] }} sx={{ mb: 3 }} />
                      {slotsLoading && <Box sx={{ textAlign: 'center', py: 2 }}><CircularProgress size={24} /></Box>}
                      {!slotsLoading && slots.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" fontWeight={700} mb={1.5}>Available Slots ({slots.length})</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {slots.map((slot) => (
                              <motion.div key={slot} whileTap={{ scale: .95 }}>
                                <Chip label={slot} clickable onClick={() => setChosen((p) => ({ ...p, slot }))}
                                  sx={{ bgcolor: chosen.slot === slot ? '#0EA5E9' : '#F0F9FF', color: chosen.slot === slot ? '#fff' : '#0EA5E9', border: `1px solid ${chosen.slot === slot ? '#0EA5E9' : '#BAE6FD'}`, fontWeight: 700 }} />
                              </motion.div>
                            ))}
                          </Box>
                        </Box>
                      )}
                      {!slotsLoading && chosen.date && slots.length === 0 && <Alert severity="info" sx={{ mb: 3 }}>No slots on this date. Try another day.</Alert>}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<MdArrowBack />} onClick={() => setStep(0)} sx={{ flex: 1 }}>Back</Button>
                        <Button variant="contained" endIcon={<MdArrowForward />} onClick={() => setStep(2)} disabled={!chosen.date || !chosen.slot} sx={{ flex: 1 }}>Continue</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardContent sx={{ p: 3.5 }}>
                      <Typography variant="h6" fontWeight={700} mb={3}>Confirm Your Booking</Typography>
                      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                      {[['Doctor', chosen.doctor?.doctor_name], ['Specialization', chosen.doctor?.specialization], ['Hospital', chosen.doctor?.hospital], ['Date', chosen.date], ['Time', chosen.slot], ['Fee', `₹${chosen.doctor?.consultation_fee}`]].map(([label, value]) => (
                        <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #F1F5F9' }}>
                          <Typography variant="body2" color="text.secondary">{label}</Typography>
                          <Typography variant="body2" fontWeight={700}>{value}</Typography>
                        </Box>
                      ))}
                      <TextField fullWidth label="Describe your symptoms *" multiline rows={3}
                        value={chosen.symptoms} onChange={(e) => setChosen((p) => ({ ...p, symptoms: e.target.value }))}
                        placeholder="E.g. Fever for 3 days, headache, fatigue…" sx={{ mt: 2.5 }} />
                      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button variant="outlined" startIcon={<MdArrowBack />} onClick={() => setStep(1)} disabled={booking} sx={{ flex: 1 }}>Back</Button>
                        <motion.div style={{ flex: 1 }} whileTap={{ scale: .97 }}>
                          <Button variant="contained" fullWidth onClick={handleBook} disabled={booking || !chosen.symptoms.trim()} sx={{ py: 1.4, fontWeight: 700 }}>
                            {booking ? <CircularProgress size={22} color="inherit" /> : 'Confirm Booking ✓'}
                          </Button>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Layout>
  );
}