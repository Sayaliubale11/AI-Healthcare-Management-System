import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, Chip, Button, TextField, MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { MdStar, MdSearch, MdLocalHospital } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/PublicNavbar';
import PublicFooter from '../../components/PublicFooter';
import { useAuth } from '../../context/AuthContext';

const DOCTORS = [
  { name:'Dr. Priya Sharma',    spec:'Cardiology',       exp:15, rating:4.9, hospital:'Apollo Hospital', fee:800,  color:'#0EA5E9', qual:'MBBS, MD Cardiology' },
  { name:'Dr. Rahul Verma',     spec:'Neurology',        exp:12, rating:4.8, hospital:'Fortis Hospital',  fee:900,  color:'#8B5CF6', qual:'MBBS, DM Neurology' },
  { name:'Dr. Sneha Patel',     spec:'Dermatology',      exp:10, rating:4.9, hospital:'Max Hospital',     fee:600,  color:'#14B8A6', qual:'MBBS, MD Dermatology' },
  { name:'Dr. Amit Kumar',      spec:'Orthopedic',       exp:18, rating:4.7, hospital:'AIIMS Delhi',      fee:1000, color:'#F59E0B', qual:'MBBS, MS Orthopedics' },
  { name:'Dr. Kavya Reddy',     spec:'Pediatrics',       exp:8,  rating:5.0, hospital:'Rainbow Children', fee:500,  color:'#EF4444', qual:'MBBS, DCH, MD' },
  { name:'Dr. Vikram Singh',    spec:'General Medicine', exp:20, rating:4.8, hospital:'City Hospital',    fee:400,  color:'#22C55E', qual:'MBBS, MD Medicine' },
  { name:'Dr. Meera Nair',      spec:'Gynecology',       exp:14, rating:4.9, hospital:'Manipal Hospital', fee:700,  color:'#EC4899', qual:'MBBS, MS OBG' },
  { name:'Dr. Arun Sharma',     spec:'ENT',              exp:11, rating:4.7, hospital:'Columbia Asia',    fee:550,  color:'#06B6D4', qual:'MBBS, MS ENT' },
  { name:'Dr. Pooja Gupta',     spec:'Ophthalmology',    exp:9,  rating:4.8, hospital:'LV Prasad',       fee:650,  color:'#F97316', qual:'MBBS, MS Ophthalmology' },
];

export default function DoctorsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch]       = useState('');
  const [specFilter, setSpecFilter] = useState('All');

  const SPECS = ['All', ...new Set(DOCTORS.map((d) => d.spec))];

  const filtered = DOCTORS.filter((d) => {
    const q = search.toLowerCase();
    return (!q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q))
        && (specFilter === 'All' || d.spec === specFilter);
  });

  return (
    <Box sx={{ bgcolor:'#F8FAFC', minHeight:'100vh' }}>
      <PublicNavbar />

      {/* Hero */}
      <Box sx={{ py:10, background:'linear-gradient(135deg,#EFF6FF,#E0F2FE)', textAlign:'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <Chip label="Our Medical Team" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
            <Typography variant="h2" fontWeight={900} mb={2}>
              Meet Our <Box component="span" className="gradient-text">Expert Doctors</Box>
            </Typography>
            <Typography color="text.secondary" fontSize="1.1rem">
              All doctors are verified, experienced, and committed to providing the best care.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ py:5 }}>
        <Grid container spacing={2} mb={5}>
          <Grid item xs={12} md={7}>
            <TextField fullWidth placeholder="Search by name, specialization, hospital…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <MdSearch color="#94A3B8" style={{ marginRight:8 }} /> }} />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField select fullWidth label="Specialization" value={specFilter}
              onChange={(e) => setSpecFilter(e.target.value)}>
              {SPECS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filtered.map((doc, i) => (
            <Grid item xs={12} sm={6} md={4} key={doc.name}>
              <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.06 }} whileHover={{ y:-5 }}>
                <Card>
                  <CardContent sx={{ p:3, textAlign:'center' }}>
                    <Avatar sx={{ width:76, height:76, mx:'auto', mb:2, fontSize:28, fontWeight:800, background:`linear-gradient(135deg,${doc.color},${doc.color}bb)`, boxShadow:`0 8px 24px ${doc.color}40` }}>
                      {doc.name.split(' ')[1][0]}
                    </Avatar>
                    <Typography fontWeight={700} variant="h6">{doc.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>{doc.qual}</Typography>
                    <Chip label={doc.spec} size="small" sx={{ bgcolor:`${doc.color}15`, color:doc.color, fontWeight:600, mb:1.5 }} />
                    <Box sx={{ display:'flex', alignItems:'center', gap:.5, justifyContent:'center', mb:.5 }}>
                      <MdLocalHospital size={14} color="#94A3B8" />
                      <Typography variant="caption" color="text.secondary">{doc.hospital}</Typography>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', gap:4, mb:2.5, mt:1.5 }}>
                      <Box sx={{ textAlign:'center' }}>
                        <Typography fontWeight={700} color="primary.main">{doc.exp} yrs</Typography>
                        <Typography variant="caption" color="text.secondary">Experience</Typography>
                      </Box>
                      <Box sx={{ textAlign:'center' }}>
                        <Box sx={{ display:'flex', alignItems:'center', gap:.3, justifyContent:'center' }}>
                          <MdStar color="#F59E0B" size={15} />
                          <Typography fontWeight={700}>{doc.rating}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">Rating</Typography>
                      </Box>
                      <Box sx={{ textAlign:'center' }}>
                        <Typography fontWeight={700} color="#22C55E">₹{doc.fee}</Typography>
                        <Typography variant="caption" color="text.secondary">Fee</Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" fullWidth size="small"
                      onClick={() => navigate(isAuthenticated ? '/patient/book' : '/register')}
                      sx={{ borderRadius:2, borderColor:doc.color, color:doc.color, '&:hover':{ bgcolor:`${doc.color}08` } }}>
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <PublicFooter />
    </Box>
  );
}