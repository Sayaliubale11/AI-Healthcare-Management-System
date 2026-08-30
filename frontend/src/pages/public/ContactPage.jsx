import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  TextField, Button, Chip, Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { MdPhone, MdEmail, MdLocationOn, MdSend, MdAccessTime } from 'react-icons/md';
import PublicNavbar from '../../components/PublicNavbar';
import PublicFooter from '../../components/PublicFooter';

const CONTACT_INFO = [
  { icon: MdPhone,       color:'#0EA5E9', bg:'#EFF6FF', title:'Phone',         value:'+91 98765 43210',        sub:'Mon–Sat, 9AM–6PM' },
  { icon: MdEmail,       color:'#8B5CF6', bg:'#F5F3FF', title:'Email',         value:'support@medinova.ai',     sub:'We reply within 24 hours' },
  { icon: MdLocationOn,  color:'#14B8A6', bg:'#F0FDFA', title:'Head Office',   value:'Mumbai, Maharashtra',     sub:'India - 400001' },
  { icon: MdAccessTime,  color:'#F59E0B', bg:'#FFFBEB', title:'Support Hours', value:'24/7 AI Support',        sub:'Human: Mon–Sat 9AM–6PM' },
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]     = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); setSent(true); setForm({ name:'', email:'', subject:'', message:'' }); };

  return (
    <Box sx={{ bgcolor:'#F8FAFC', minHeight:'100vh' }}>
      <PublicNavbar />

      {/* Hero */}
      <Box sx={{ py:10, background:'linear-gradient(135deg,#EFF6FF,#E0F2FE)', textAlign:'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <Chip label="Get in Touch" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
            <Typography variant="h2" fontWeight={900} mb={2}>
              Contact <Box component="span" className="gradient-text">MediNova</Box>
            </Typography>
            <Typography color="text.secondary" fontSize="1.1rem">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py:10 }}>
        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Typography variant="h5" fontWeight={700} mb={3}>Get in Touch</Typography>
            <Grid container spacing={2}>
              {CONTACT_INFO.map((item, i) => (
                <Grid item xs={12} sm={6} md={12} key={item.title}>
                  <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.1 }}>
                    <Card>
                      <CardContent sx={{ p:2.5, display:'flex', alignItems:'center', gap:2 }}>
                        <Box sx={{ width:48, height:48, borderRadius:2, bgcolor:item.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <item.icon size={24} color={item.color} />
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{item.title}</Typography>
                          <Typography fontWeight={700} variant="body2">{item.value}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <Card>
                <CardContent sx={{ p:4 }}>
                  <Typography variant="h6" fontWeight={700} mb={3}>Send us a Message</Typography>
                  {sent && (
                    <Alert severity="success" sx={{ mb:2.5, borderRadius:2 }} onClose={() => setSent(false)}>
                      Thank you! Your message has been sent. We'll reply within 24 hours.
                    </Alert>
                  )}
                  <Box component="form" onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Your Name" name="name" value={form.name} onChange={onChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email Address" name="email" type="email" value={form.email} onChange={onChange} required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Subject" name="subject" value={form.subject} onChange={onChange} required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Message" name="message" value={form.message} onChange={onChange} required multiline rows={5} placeholder="Tell us how we can help you…" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" size="large" fullWidth
                          startIcon={<MdSend />}
                          sx={{ py:1.6, borderRadius:2.5, fontWeight:700 }}>
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <PublicFooter />
    </Box>
  );
}