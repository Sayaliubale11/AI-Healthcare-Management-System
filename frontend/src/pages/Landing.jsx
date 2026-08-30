// import React from 'react';
// import {
//   Box, Button, Typography, Container, Grid, Card, CardContent,
//   Avatar, Chip,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import {
//   MdStar, MdArrowForward, MdCheckCircle,
//   MdBiotech, MdCalendarToday, MdShield, MdPeople,
// } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import PublicNavbar from '../components/PublicNavbar';
// import PublicFooter from '../components/PublicFooter';

// const FV = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
//   }),
// };

// const FEATURES = [
//   { icon: MdBiotech,       color:'#8B5CF6', bg:'#F5F3FF', title:'AI Symptom Checker',        desc:'Machine-learning model predicts diseases from your symptoms instantly with high accuracy.' },
//   { icon: MdCalendarToday, color:'#0EA5E9', bg:'#EFF6FF', title:'Smart Appointment Booking', desc:'Book with any specialist in seconds. Real-time slot availability and instant confirmation.' },
//   { icon: MdPeople,        color:'#14B8A6', bg:'#F0FDFA', title:'500+ Expert Doctors',       desc:'Verified specialists across all disciplines — cardiology, neurology, pediatrics, and more.' },
//   { icon: MdShield,        color:'#22C55E', bg:'#F0FDF4', title:'Secure & Private',          desc:'Bank-grade encryption protects your health data. HIPAA compliant and ISO 27001 certified.' },
// ];

// const STATS = [
//   { value:'50K+', label:'Patients Served' },
//   { value:'500+', label:'Expert Doctors' },
//   { value:'98%',  label:'Satisfaction' },
//   { value:'24/7', label:'AI Support' },
// ];

// const DOCTORS = [
//   { name:'Dr. Priya Sharma',  spec:'Cardiologist',      exp:'15 yrs', rating:4.9, color:'#0EA5E9' },
//   { name:'Dr. Rahul Verma',   spec:'Neurologist',       exp:'12 yrs', rating:4.8, color:'#8B5CF6' },
//   { name:'Dr. Sneha Patel',   spec:'Dermatologist',     exp:'10 yrs', rating:4.9, color:'#14B8A6' },
//   { name:'Dr. Amit Kumar',    spec:'Orthopedic',        exp:'18 yrs', rating:4.7, color:'#F59E0B' },
//   { name:'Dr. Kavya Reddy',   spec:'Pediatrician',      exp:'8 yrs',  rating:5.0, color:'#EF4444' },
//   { name:'Dr. Vikram Singh',  spec:'General Physician', exp:'20 yrs', rating:4.8, color:'#22C55E' },
// ];

// export default function Landing() {
//   const navigate = useNavigate();
//   const { isAuthenticated, role } = useAuth();

//   const goDashboard = () => {
//     if (!isAuthenticated) { navigate('/register'); return; }
//     if (role === 'DOCTOR') navigate('/doctor/dashboard');
//     else if (role === 'ADMIN') navigate('/admin/dashboard');
//     else navigate('/patient/dashboard');
//   };

//   return (
//     <Box sx={{ bgcolor:'#F8FAFC', minHeight:'100vh' }}>
//       <PublicNavbar transparent />

//       {/* ── HERO ─────────────────────────────────────────────────────── */}
//       <Box sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg,#EFF6FF 0%,#E0F2FE 45%,#ECFDF5 100%)',
//         display: 'flex', alignItems: 'center',
//         pt: { xs:10, md:8 }, pb:8,
//         position: 'relative', overflow: 'hidden',
//       }}>
//         <Box sx={{ position:'absolute', width:600, height:600, top:-150, right:-150, bgcolor:'rgba(14,165,233,.07)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
//         <Box sx={{ position:'absolute', width:400, height:400, bottom:-100, left:-100, bgcolor:'rgba(20,184,166,.07)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />

//         <Container maxWidth="lg" sx={{ position:'relative', zIndex:1 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div variants={FV} initial="hidden" animate="visible" custom={0}>
//                 <Chip label="🤖 Powered by Machine Learning AI"
//                   sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:3, px:1 }} />
//               </motion.div>
//               <motion.div variants={FV} initial="hidden" animate="visible" custom={1}>
//                 <Typography variant="h2" fontWeight={900} lineHeight={1.12} mb={2.5}
//                   sx={{ fontSize:{ xs:'2.2rem', md:'3.4rem' } }}>
//                   Your Health,{' '}
//                   <Box component="span" className="gradient-text">Powered by AI</Box>
//                 </Typography>
//               </motion.div>
//               <motion.div variants={FV} initial="hidden" animate="visible" custom={2}>
//                 <Typography variant="h6" color="text.secondary" fontWeight={400} lineHeight={1.7} mb={4}
//                   sx={{ fontSize:{ xs:'1rem', md:'1.1rem' }, maxWidth:500 }}>
//                   Book appointments with top doctors, analyze symptoms with AI, and manage your complete healthcare journey — all in one secure platform.
//                 </Typography>
//               </motion.div>
//               <motion.div variants={FV} initial="hidden" animate="visible" custom={3}>
//                 <Box sx={{ display:'flex', gap:2, flexWrap:'wrap', mb:5 }}>
//                   <Button variant="contained" size="large" endIcon={<MdArrowForward />} onClick={goDashboard}
//                     sx={{ py:1.8, px:4, fontSize:'1rem', borderRadius:3, boxShadow:'0 8px 32px rgba(14,165,233,.4)',
//                       '&:hover':{ boxShadow:'0 12px 40px rgba(14,165,233,.5)', transform:'translateY(-2px)' }, transition:'all .3s' }}>
//                     {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
//                   </Button>
//                   {!isAuthenticated && (
//                     <Button variant="outlined" size="large" onClick={() => navigate('/login')}
//                       sx={{ py:1.8, px:4, fontSize:'1rem', borderRadius:3, borderColor:'#0EA5E9', color:'#0EA5E9',
//                         '&:hover':{ bgcolor:'rgba(14,165,233,.06)', transform:'translateY(-1px)' }, transition:'all .3s' }}>
//                       Sign In
//                     </Button>
//                   )}
//                 </Box>
//               </motion.div>
//               <motion.div variants={FV} initial="hidden" animate="visible" custom={4}>
//                 <Box sx={{ display:'flex', gap:3, flexWrap:'wrap' }}>
//                   {['HIPAA Compliant','ISO 27001 Certified','256-bit Encryption'].map((b) => (
//                     <Box key={b} sx={{ display:'flex', alignItems:'center', gap:0.7 }}>
//                       <MdCheckCircle color="#22C55E" size={16} />
//                       <Typography variant="caption" color="text.secondary" fontWeight={600}>{b}</Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               </motion.div>
//             </Grid>

//             {/* Right visual */}
//             <Grid item xs={12} md={6}>
//               <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, delay:.2 }}>
//                 <Box sx={{ position:'relative' }}>
//                   <Box sx={{ background:'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)', borderRadius:5, p:4, color:'#fff', boxShadow:'0 32px 80px rgba(14,165,233,.3)' }}>
//                     <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:3 }}>
//                       <Box sx={{ width:52, height:52, bgcolor:'rgba(255,255,255,.2)', borderRadius:2.5, display:'flex', alignItems:'center', justifyContent:'center' }}>
//                         <MdBiotech size={28} color="#fff" />
//                       </Box>
//                       <Box>
//                         <Typography fontWeight={800} fontSize={17}>AI Diagnosis Engine</Typography>
//                         <Typography fontSize={13} sx={{ opacity:.8 }}>Real-time symptom analysis</Typography>
//                       </Box>
//                     </Box>
//                     {[
//                       { s:'Headache + Fever + Nausea',    d:'Viral Infection',    c:'#86EFAC', conf:'94%' },
//                       { s:'Chest Pain + Breathlessness',  d:'Cardiology Needed',  c:'#FDE68A', conf:'89%' },
//                       { s:'Skin Rash + Itching',          d:'Dermatitis',         c:'#C4B5FD', conf:'92%' },
//                     ].map((item, i) => (
//                       <motion.div key={i} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:.6+i*.15 }}>
//                         <Box sx={{ bgcolor:'rgba(255,255,255,.12)', borderRadius:2.5, p:2, mb:1.5, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//                           <Box>
//                             <Typography fontSize={11} sx={{ opacity:.75 }}>{item.s}</Typography>
//                             <Typography fontSize={14} fontWeight={700}>{item.d}</Typography>
//                           </Box>
//                           <Box sx={{ bgcolor:'rgba(255,255,255,.15)', borderRadius:2, px:1.5, py:.5 }}>
//                             <Typography fontSize={13} fontWeight={800} color={item.c}>{item.conf}</Typography>
//                           </Box>
//                         </Box>
//                       </motion.div>
//                     ))}
//                   </Box>
//                   <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:3, ease:'easeInOut' }}
//                     style={{ position:'absolute', top:-20, right:-20 }}>
//                     <Box sx={{ bgcolor:'#fff', borderRadius:3, p:2, boxShadow:'0 8px 32px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:1.5 }}>
//                       <Box sx={{ width:38, height:38, bgcolor:'#D1FAE5', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center' }}>
//                         <MdCalendarToday color="#059669" size={20} />
//                       </Box>
//                       <Box>
//                         <Typography fontSize={11} color="text.secondary">Next Appointment</Typography>
//                         <Typography fontSize={13} fontWeight={700}>Today, 3:00 PM</Typography>
//                       </Box>
//                     </Box>
//                   </motion.div>
//                   <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:3.5, ease:'easeInOut', delay:.5 }}
//                     style={{ position:'absolute', bottom:-20, left:-20 }}>
//                     <Box sx={{ bgcolor:'#fff', borderRadius:3, p:2, boxShadow:'0 8px 32px rgba(0,0,0,.12)', display:'flex', alignItems:'center', gap:1.5 }}>
//                       <Box sx={{ display:'flex' }}>
//                         {['#0EA5E9','#22C55E','#F59E0B'].map((c, i) => (
//                           <Avatar key={i} sx={{ width:26, height:26, bgcolor:c, fontSize:10, ml:i?-0.7:0, border:'2px solid #fff', fontWeight:700 }}>
//                             {['P','D','A'][i]}
//                           </Avatar>
//                         ))}
//                       </Box>
//                       <Box>
//                         <Typography fontSize={11} color="text.secondary">Active Users</Typography>
//                         <Typography fontSize={13} fontWeight={700}>50,000+</Typography>
//                       </Box>
//                     </Box>
//                   </motion.div>
//                 </Box>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* ── STATS ────────────────────────────────────────────────────── */}
//       <Box sx={{ py:8, bgcolor:'#fff', borderTop:'1px solid #E0F2FE', borderBottom:'1px solid #E0F2FE' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4} justifyContent="center">
//             {STATS.map((s, i) => (
//               <Grid item xs={6} sm={3} key={s.label}>
//                 <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.1 }}>
//                   <Box sx={{ textAlign:'center' }}>
//                     <Typography variant="h3" fontWeight={900} className="gradient-text">{s.value}</Typography>
//                     <Typography color="text.secondary" fontWeight={500} mt={.5}>{s.label}</Typography>
//                   </Box>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* ── FEATURES 2×2 GRID ────────────────────────────────────────── */}
//       <Box id="features" sx={{ py:10, bgcolor:'#F8FAFC' }}>
//         <Container maxWidth="lg">
//           <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
//             <Box sx={{ textAlign:'center', mb:7 }}>
//               <Chip label="Features" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
//               <Typography variant="h3" fontWeight={800} mb={2}>
//                 Why Choose <Box component="span" className="gradient-text">MediNova?</Box>
//               </Typography>
//               <Typography color="text.secondary" sx={{ maxWidth:520, mx:'auto', fontSize:'1.05rem' }}>
//                 Everything you need to manage your health in one intelligent platform.
//               </Typography>
//             </Box>
//           </motion.div>

//           {/* ✅ FIXED: Proper 2×2 grid with icon + text side by side */}
//           <Grid container spacing={3}>
//             {FEATURES.map((f, i) => (
//               <Grid item xs={12} sm={6} key={f.title}>
//                 <motion.div
//                   initial={{ opacity:0, y:40 }}
//                   whileInView={{ opacity:1, y:0 }}
//                   viewport={{ once:true }}
//                   transition={{ delay:i*.1 }}
//                   whileHover={{ y:-6 }}
//                 >
//                   <Card sx={{ height:'100%' }}>
//                     <CardContent sx={{ p:4 }}>
//                       <Box sx={{ display:'flex', alignItems:'flex-start', gap:3 }}>
//                         <Box sx={{
//                           width:64, height:64, borderRadius:3, bgcolor:f.bg,
//                           display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
//                         }}>
//                           <f.icon size={32} color={f.color} />
//                         </Box>
//                         <Box>
//                           <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
//                           <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{ textAlign:'center', mt:5 }}>
//             <Button variant="outlined" size="large" onClick={() => navigate('/features')}
//               sx={{ borderRadius:3, px:5, py:1.5, borderColor:'#0EA5E9', color:'#0EA5E9' }}>
//               View All Features →
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── DOCTORS ──────────────────────────────────────────────────── */}
//       <Box id="doctors" sx={{ py:10, bgcolor:'#fff' }}>
//         <Container maxWidth="lg">
//           <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
//             <Box sx={{ textAlign:'center', mb:7 }}>
//               <Chip label="Our Doctors" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
//               <Typography variant="h3" fontWeight={800} mb={2}>
//                 Meet Our <Box component="span" className="gradient-text">Expert Team</Box>
//               </Typography>
//             </Box>
//           </motion.div>
//           <Grid container spacing={3}>
//             {DOCTORS.map((doc, i) => (
//               <Grid item xs={12} sm={6} md={4} key={doc.name}>
//                 <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }} whileHover={{ y:-5 }}>
//                   <Card>
//                     <CardContent sx={{ p:3, textAlign:'center' }}>
//                       <Avatar sx={{ width:76, height:76, mx:'auto', mb:2, fontSize:28, fontWeight:800, background:`linear-gradient(135deg,${doc.color},${doc.color}bb)`, boxShadow:`0 8px 24px ${doc.color}40` }}>
//                         {doc.name.split(' ')[1][0]}
//                       </Avatar>
//                       <Typography fontWeight={700} variant="h6">{doc.name}</Typography>
//                       <Chip label={doc.spec} size="small" sx={{ bgcolor:`${doc.color}15`, color:doc.color, fontWeight:600, my:1 }} />
//                       <Box sx={{ display:'flex', justifyContent:'center', gap:4, mb:2.5 }}>
//                         <Box sx={{ textAlign:'center' }}>
//                           <Typography fontWeight={700} color="primary.main">{doc.exp}</Typography>
//                           <Typography variant="caption" color="text.secondary">Experience</Typography>
//                         </Box>
//                         <Box sx={{ textAlign:'center' }}>
//                           <Box sx={{ display:'flex', alignItems:'center', gap:.3, justifyContent:'center' }}>
//                             <MdStar color="#F59E0B" size={16} />
//                             <Typography fontWeight={700}>{doc.rating}</Typography>
//                           </Box>
//                           <Typography variant="caption" color="text.secondary">Rating</Typography>
//                         </Box>
//                       </Box>
//                       <Button variant="outlined" fullWidth size="small"
//                         onClick={() => navigate(isAuthenticated ? '/patient/book' : '/register')}
//                         sx={{ borderRadius:2, borderColor:doc.color, color:doc.color, '&:hover':{ bgcolor:`${doc.color}08` } }}>
//                         Book Appointment
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ textAlign:'center', mt:5 }}>
//             <Button variant="outlined" size="large" onClick={() => navigate('/doctors-info')}
//               sx={{ borderRadius:3, px:5, py:1.5, borderColor:'#0EA5E9', color:'#0EA5E9' }}>
//               View All Doctors →
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── HOW IT WORKS — 3 COLUMNS SIDE BY SIDE ────────────────────── */}
//       <Box id="how-it-works" sx={{ py:10, background:'linear-gradient(135deg,#EFF6FF,#E0F2FE,#ECFDF5)' }}>
//         <Container maxWidth="lg">
//           <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
//             <Box sx={{ textAlign:'center', mb:7 }}>
//               <Chip label="How It Works" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
//               <Typography variant="h3" fontWeight={800}>3 Simple Steps</Typography>
//             </Box>
//           </motion.div>
//           {/* ✅ FIXED: 3 columns side by side on all screens */}
//           <Grid container spacing={4} justifyContent="center">
//             {[
//               { n:'01', title:'Create Account',   desc:'Register as a patient or doctor in under 2 minutes.',                    color:'#0EA5E9' },
//               { n:'02', title:'Find Your Doctor', desc:'Search specialists by condition, view availability and book instantly.',   color:'#8B5CF6' },
//               { n:'03', title:'Heal & Recover',   desc:'Attend your appointment, get diagnosis, and access your records anytime.', color:'#14B8A6' },
//             ].map((item, i) => (
//               <Grid item xs={12} sm={4} key={item.n}>
//                 <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.15 }}>
//                   <Box sx={{ textAlign:'center', p:3 }}>
//                     <Box sx={{
//                       width:80, height:80, borderRadius:'50%', mx:'auto', mb:2.5,
//                       background:`linear-gradient(135deg,${item.color},${item.color}99)`,
//                       display:'flex', alignItems:'center', justifyContent:'center',
//                       boxShadow:`0 8px 24px ${item.color}40`,
//                     }}>
//                       <Typography fontWeight={900} color="#fff" fontSize={24}>{item.n}</Typography>
//                     </Box>
//                     <Typography variant="h6" fontWeight={700} mb={1}>{item.title}</Typography>
//                     <Typography color="text.secondary" lineHeight={1.7}>{item.desc}</Typography>
//                   </Box>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* ── CTA ──────────────────────────────────────────────────────── */}
//       <Box sx={{ py:10, background:'linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)' }}>
//         <Container maxWidth="md">
//           <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
//             <Box sx={{ textAlign:'center' }}>
//               <Typography variant="h3" fontWeight={900} color="#fff" mb={2}>
//                 Ready to Transform Your Healthcare?
//               </Typography>
//               <Typography color="rgba(255,255,255,.85)" fontSize="1.1rem" mb={5} sx={{ maxWidth:480, mx:'auto' }}>
//                 Join 50,000+ patients and 500+ doctors who trust MediNova for better health outcomes.
//               </Typography>
//               <Button size="large" onClick={goDashboard}
//                 sx={{ bgcolor:'#fff', color:'#0EA5E9', fontWeight:700, px:6, py:2, borderRadius:3, fontSize:'1.05rem',
//                   '&:hover':{ bgcolor:'rgba(255,255,255,.92)', transform:'translateY(-2px)', boxShadow:'0 8px 24px rgba(0,0,0,.2)' }, transition:'all .3s' }}>
//                 {isAuthenticated ? 'Go to Dashboard' : 'Start for Free →'}
//               </Button>
//             </Box>
//           </motion.div>
//         </Container>
//       </Box>

//       <PublicFooter />
//     </Box>
//   );
// }



import React from "react";

import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";

import { motion } from "framer-motion";

import {
  MdStar,
  MdArrowForward,
  MdCheckCircle,
  MdBiotech,
  MdCalendarToday,
  MdShield,
  MdPeople,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";


/* =========================================================
   ANIMATION
========================================================= */

const FV = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};


/* =========================================================
   FEATURES
========================================================= */

const FEATURES = [
  {
    icon: MdBiotech,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    title: "AI Symptom Checker",
    desc: "Machine-learning model predicts diseases from your symptoms instantly with high accuracy.",
  },

  {
    icon: MdCalendarToday,
    color: "#0EA5E9",
    bg: "#EFF6FF",
    title: "Smart Appointment Booking",
    desc: "Book with any specialist in seconds. Real-time slot availability and instant confirmation.",
  },

  {
    icon: MdPeople,
    color: "#14B8A6",
    bg: "#F0FDFA",
    title: "500+ Expert Doctors",
    desc: "Verified specialists across all disciplines — cardiology, neurology, pediatrics, and more.",
  },

  {
    icon: MdShield,
    color: "#22C55E",
    bg: "#F0FDF4",
    title: "Secure & Private",
    desc: "Bank-grade encryption protects your health data. HIPAA compliant and ISO 27001 certified.",
  },
];


/* =========================================================
   STATS
========================================================= */

const STATS = [
  {
    value: "50K+",
    label: "Patients Served",
  },

  {
    value: "500+",
    label: "Expert Doctors",
  },

  {
    value: "98%",
    label: "Satisfaction",
  },

  {
    value: "24/7",
    label: "AI Support",
  },
];


/* =========================================================
   DOCTORS
========================================================= */

const DOCTORS = [
  {
    name: "Dr. Priya Sharma",
    spec: "Cardiologist",
    exp: "15 yrs",
    rating: 4.9,
    color: "#0EA5E9",
  },

  {
    name: "Dr. Rahul Verma",
    spec: "Neurologist",
    exp: "12 yrs",
    rating: 4.8,
    color: "#8B5CF6",
  },

  {
    name: "Dr. Sneha Patel",
    spec: "Dermatologist",
    exp: "10 yrs",
    rating: 4.9,
    color: "#14B8A6",
  },

  {
    name: "Dr. Amit Kumar",
    spec: "Orthopedic",
    exp: "18 yrs",
    rating: 4.7,
    color: "#F59E0B",
  },

  {
    name: "Dr. Kavya Reddy",
    spec: "Pediatrician",
    exp: "8 yrs",
    rating: 5.0,
    color: "#EF4444",
  },

  {
    name: "Dr. Vikram Singh",
    spec: "General Physician",
    exp: "20 yrs",
    rating: 4.8,
    color: "#22C55E",
  },
];


/* =========================================================
   LANDING PAGE
========================================================= */

export default function Landing() {

  const navigate = useNavigate();

  const {
    isAuthenticated,
    role,
  } = useAuth();


  /* =======================================================
     DASHBOARD NAVIGATION
  ======================================================= */

  const goDashboard = () => {

    if (!isAuthenticated) {
      navigate("/register");
      return;
    }

    if (role === "DOCTOR") {
      navigate("/doctor/dashboard");
    }

    else if (role === "ADMIN") {
      navigate("/admin/dashboard");
    }

    else {
      navigate("/patient/dashboard");
    }
  };


  return (

    <Box
      sx={{
        bgcolor: "#F8FAFC",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >

      <PublicNavbar transparent />


      {/* =====================================================
          HERO
      ===================================================== */}

      <Box
        sx={{
          minHeight: "100vh",

          background:
            "linear-gradient(135deg,#EFF6FF 0%,#E0F2FE 45%,#ECFDF5 100%)",

          display: "flex",
          alignItems: "center",

          pt: {
            xs: 12,
            md: 10,
          },

          pb: 8,

          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* Background circles */}

        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -150,
            right: -150,
            bgcolor: "rgba(14,165,233,.07)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            bottom: -100,
            left: -100,
            bgcolor: "rgba(20,184,166,.07)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />


        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >

          <Grid
            container
            spacing={{
              xs: 5,
              md: 8,
            }}
            alignItems="center"
          >


            {/* =================================================
                HERO LEFT
            ================================================= */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <motion.div
                variants={FV}
                initial="hidden"
                animate="visible"
                custom={0}
              >

                <Chip
                  label="🤖 Powered by Machine Learning AI"
                  sx={{
                    bgcolor: "rgba(14,165,233,.1)",
                    color: "#0284C7",
                    fontWeight: 700,
                    mb: 3,
                    px: 1,
                  }}
                />

              </motion.div>


              <motion.div
                variants={FV}
                initial="hidden"
                animate="visible"
                custom={1}
              >

                <Typography
                  variant="h2"
                  fontWeight={900}
                  lineHeight={1.12}
                  mb={2.5}
                  sx={{
                    fontSize: {
                      xs: "2.2rem",
                      md: "3.4rem",
                    },
                  }}
                >

                  Your Health,{" "}

                  <Box
                    component="span"
                    className="gradient-text"
                  >
                    Powered by AI
                  </Box>

                </Typography>

              </motion.div>


              <motion.div
                variants={FV}
                initial="hidden"
                animate="visible"
                custom={2}
              >

                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight={400}
                  lineHeight={1.7}
                  mb={4}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: "1.1rem",
                    },

                    maxWidth: 500,
                  }}
                >

                  Book appointments with top doctors, analyze
                  symptoms with AI, and manage your complete
                  healthcare journey — all in one secure platform.

                </Typography>

              </motion.div>


              {/* Buttons */}

              <motion.div
                variants={FV}
                initial="hidden"
                animate="visible"
                custom={3}
              >

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 5,
                  }}
                >

                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<MdArrowForward />}
                    onClick={goDashboard}
                    sx={{
                      py: 1.8,
                      px: 4,
                      fontSize: "1rem",
                      borderRadius: 3,

                      boxShadow:
                        "0 8px 32px rgba(14,165,233,.4)",

                      "&:hover": {
                        boxShadow:
                          "0 12px 40px rgba(14,165,233,.5)",
                        transform: "translateY(-2px)",
                      },

                      transition: "all .3s",
                    }}
                  >

                    {isAuthenticated
                      ? "Go to Dashboard"
                      : "Get Started Free"}

                  </Button>


                  {!isAuthenticated && (

                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate("/login")}
                      sx={{
                        py: 1.8,
                        px: 4,
                        fontSize: "1rem",
                        borderRadius: 3,
                        borderColor: "#0EA5E9",
                        color: "#0EA5E9",

                        "&:hover": {
                          bgcolor: "rgba(14,165,233,.06)",
                          transform: "translateY(-1px)",
                        },

                        transition: "all .3s",
                      }}
                    >

                      Sign In

                    </Button>

                  )}

                </Box>

              </motion.div>


              {/* Security badges */}

              <motion.div
                variants={FV}
                initial="hidden"
                animate="visible"
                custom={4}
              >

                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                  }}
                >

                  {[
                    "HIPAA Compliant",
                    "ISO 27001 Certified",
                    "256-bit Encryption",
                  ].map((b) => (

                    <Box
                      key={b}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                      }}
                    >

                      <MdCheckCircle
                        color="#22C55E"
                        size={16}
                      />

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        {b}
                      </Typography>

                    </Box>

                  ))}

                </Box>

              </motion.div>

            </Grid>


            {/* =================================================
                HERO RIGHT
            ================================================= */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <motion.div
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
              >

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 560,
                    mx: "auto",
                  }}
                >

                  {/* AI Card */}

                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)",

                      borderRadius: 5,

                      p: {
                        xs: 3,
                        md: 4,
                      },

                      color: "#fff",

                      boxShadow:
                        "0 32px 80px rgba(14,165,233,.3)",
                    }}
                  >

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >

                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          bgcolor: "rgba(255,255,255,.2)",
                          borderRadius: 2.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >

                        <MdBiotech
                          size={28}
                          color="#fff"
                        />

                      </Box>


                      <Box>

                        <Typography
                          fontWeight={800}
                          fontSize={17}
                        >
                          AI Diagnosis Engine
                        </Typography>

                        <Typography
                          fontSize={13}
                          sx={{
                            opacity: 0.8,
                          }}
                        >
                          Real-time symptom analysis
                        </Typography>

                      </Box>

                    </Box>


                    {[
                      {
                        s: "Headache + Fever + Nausea",
                        d: "Viral Infection",
                        c: "#86EFAC",
                        conf: "94%",
                      },

                      {
                        s: "Chest Pain + Breathlessness",
                        d: "Cardiology Needed",
                        c: "#FDE68A",
                        conf: "89%",
                      },

                      {
                        s: "Skin Rash + Itching",
                        d: "Dermatitis",
                        c: "#C4B5FD",
                        conf: "92%",
                      },
                    ].map((item, i) => (

                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.6 + i * 0.15,
                        }}
                      >

                        <Box
                          sx={{
                            bgcolor:
                              "rgba(255,255,255,.12)",

                            borderRadius: 2.5,

                            p: 2,

                            mb: 1.5,

                            display: "flex",

                            alignItems: "center",

                            justifyContent:
                              "space-between",
                          }}
                        >

                          <Box>

                            <Typography
                              fontSize={11}
                              sx={{
                                opacity: 0.75,
                              }}
                            >
                              {item.s}
                            </Typography>

                            <Typography
                              fontSize={14}
                              fontWeight={700}
                            >
                              {item.d}
                            </Typography>

                          </Box>


                          <Box
                            sx={{
                              bgcolor:
                                "rgba(255,255,255,.15)",

                              borderRadius: 2,

                              px: 1.5,

                              py: 0.5,
                            }}
                          >

                            <Typography
                              fontSize={13}
                              fontWeight={800}
                              color={item.c}
                            >
                              {item.conf}
                            </Typography>

                          </Box>

                        </Box>

                      </motion.div>

                    ))}

                  </Box>


                  {/* Next Appointment */}

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                    }}
                  >

                    <Box
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 3,
                        p: 2,

                        boxShadow:
                          "0 8px 32px rgba(0,0,0,.12)",

                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >

                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          bgcolor: "#D1FAE5",
                          borderRadius: 2,

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >

                        <MdCalendarToday
                          color="#059669"
                          size={20}
                        />

                      </Box>


                      <Box>

                        <Typography
                          fontSize={11}
                          color="text.secondary"
                        >
                          Next Appointment
                        </Typography>

                        <Typography
                          fontSize={13}
                          fontWeight={700}
                        >
                          Today, 3:00 PM
                        </Typography>

                      </Box>

                    </Box>

                  </motion.div>


                  {/* Active Users */}

                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    style={{
                      position: "absolute",
                      bottom: -20,
                      left: -20,
                    }}
                  >

                    <Box
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 3,
                        p: 2,

                        boxShadow:
                          "0 8px 32px rgba(0,0,0,.12)",

                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >

                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >

                        {[
                          "#0EA5E9",
                          "#22C55E",
                          "#F59E0B",
                        ].map((c, i) => (

                          <Avatar
                            key={i}
                            sx={{
                              width: 26,
                              height: 26,
                              bgcolor: c,
                              fontSize: 10,

                              ml: i ? -0.7 : 0,

                              border:
                                "2px solid #fff",

                              fontWeight: 700,
                            }}
                          >

                            {["P", "D", "A"][i]}

                          </Avatar>

                        ))}

                      </Box>


                      <Box>

                        <Typography
                          fontSize={11}
                          color="text.secondary"
                        >
                          Active Users
                        </Typography>

                        <Typography
                          fontSize={13}
                          fontWeight={700}
                        >
                          50,000+
                        </Typography>

                      </Box>

                    </Box>

                  </motion.div>

                </Box>

              </motion.div>

            </Grid>

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
          STATS
      ===================================================== */}

      <Box
        sx={{
          py: 8,
          bgcolor: "#fff",

          borderTop:
            "1px solid #E0F2FE",

          borderBottom:
            "1px solid #E0F2FE",
        }}
      >

        <Container maxWidth="lg">

          {/* 
             IMPORTANT:
             Using CSS Grid here instead of MUI Grid
             ensures the statistics remain perfectly
             centered.
          */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(4, 1fr)",
              },

              gap: {
                xs: 3,
                sm: 4,
              },

              width: "100%",

              maxWidth: "1000px",

              mx: "auto",
            }}
          >

            {STATS.map((s, i) => (

              <motion.div
                key={s.label}

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: i * 0.1,
                }}
              >

                <Box
                  sx={{
                    textAlign: "center",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >

                  <Typography
                    variant="h3"
                    fontWeight={900}
                    className="gradient-text"
                  >
                    {s.value}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontWeight={500}
                    mt={0.5}
                  >
                    {s.label}
                  </Typography>

                </Box>

              </motion.div>

            ))}

          </Box>

        </Container>

      </Box>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <Box
        id="features"
        sx={{
          py: 10,
          bgcolor: "#F8FAFC",
        }}
      >

        <Container maxWidth="lg">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <Box
              sx={{
                textAlign: "center",
                mb: 7,
              }}
            >

              <Chip
                label="Features"
                sx={{
                  bgcolor: "rgba(14,165,233,.1)",
                  color: "#0284C7",
                  fontWeight: 700,
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight={800}
                mb={2}
              >

                Why Choose{" "}

                <Box
                  component="span"
                  className="gradient-text"
                >
                  MediNova?
                </Box>

              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 520,
                  mx: "auto",
                  fontSize: "1.05rem",
                }}
              >
                Everything you need to manage your health
                in one intelligent platform.
              </Typography>

            </Box>

          </motion.div>


          {/* Features 2 x 2 */}

          <Grid
            container
            spacing={3}
          >

            {FEATURES.map((f, i) => (

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
                key={f.title}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: i * 0.1,
                  }}

                  whileHover={{
                    y: -6,
                  }}
                >

                  <Card
                    sx={{
                      height: "100%",
                    }}
                  >

                    <CardContent
                      sx={{
                        p: 4,
                      }}
                    >

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 3,
                        }}
                      >

                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            bgcolor: f.bg,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            flexShrink: 0,
                          }}
                        >

                          <f.icon
                            size={32}
                            color={f.color}
                          />

                        </Box>


                        <Box>

                          <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={1}
                          >
                            {f.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            lineHeight={1.7}
                          >
                            {f.desc}
                          </Typography>

                        </Box>

                      </Box>

                    </CardContent>

                  </Card>

                </motion.div>

              </Grid>

            ))}

          </Grid>


          <Box
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/features")}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                borderColor: "#0EA5E9",
                color: "#0EA5E9",
              }}
            >
              View All Features →
            </Button>

          </Box>

        </Container>

      </Box>


      {/* =====================================================
          DOCTORS
      ===================================================== */}

      <Box
        id="doctors"
        sx={{
          py: 10,
          bgcolor: "#fff",
        }}
      >

        <Container maxWidth="lg">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <Box
              sx={{
                textAlign: "center",
                mb: 7,
              }}
            >

              <Chip
                label="Our Doctors"
                sx={{
                  bgcolor: "rgba(14,165,233,.1)",
                  color: "#0284C7",
                  fontWeight: 700,
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight={800}
                mb={2}
              >

                Meet Our{" "}

                <Box
                  component="span"
                  className="gradient-text"
                >
                  Expert Team
                </Box>

              </Typography>

            </Box>

          </motion.div>


          <Grid
            container
            spacing={3}
          >

            {DOCTORS.map((doc, i) => (

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                key={doc.name}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: i * 0.08,
                  }}

                  whileHover={{
                    y: -5,
                  }}
                >

                  <Card>

                    <CardContent
                      sx={{
                        p: 3,
                        textAlign: "center",
                      }}
                    >

                      <Avatar
                        sx={{
                          width: 76,
                          height: 76,
                          mx: "auto",
                          mb: 2,

                          fontSize: 28,
                          fontWeight: 800,

                          background:
                            `linear-gradient(135deg,${doc.color},${doc.color}bb)`,

                          boxShadow:
                            `0 8px 24px ${doc.color}40`,
                        }}
                      >

                        {doc.name.split(" ")[1][0]}

                      </Avatar>


                      <Typography
                        fontWeight={700}
                        variant="h6"
                      >
                        {doc.name}
                      </Typography>


                      <Chip
                        label={doc.spec}
                        size="small"
                        sx={{
                          bgcolor:
                            `${doc.color}15`,

                          color:
                            doc.color,

                          fontWeight: 600,
                          my: 1,
                        }}
                      />


                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 4,
                          mb: 2.5,
                        }}
                      >

                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >

                          <Typography
                            fontWeight={700}
                            color="primary.main"
                          >
                            {doc.exp}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Experience
                          </Typography>

                        </Box>


                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.3,
                              justifyContent: "center",
                            }}
                          >

                            <MdStar
                              color="#F59E0B"
                              size={16}
                            />

                            <Typography
                              fontWeight={700}
                            >
                              {doc.rating}
                            </Typography>

                          </Box>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Rating
                          </Typography>

                        </Box>

                      </Box>


                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        onClick={() =>
                          navigate(
                            isAuthenticated
                              ? "/patient/book"
                              : "/register"
                          )
                        }
                        sx={{
                          borderRadius: 2,
                          borderColor: doc.color,
                          color: doc.color,

                          "&:hover": {
                            bgcolor:
                              `${doc.color}08`,
                          },
                        }}
                      >
                        Book Appointment
                      </Button>

                    </CardContent>

                  </Card>

                </motion.div>

              </Grid>

            ))}

          </Grid>


          <Box
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >

            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                navigate("/doctors-info")
              }
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                borderColor: "#0EA5E9",
                color: "#0EA5E9",
              }}
            >
              View All Doctors →
            </Button>

          </Box>

        </Container>

      </Box>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <Box
        id="how-it-works"
        sx={{
          py: 10,

          background:
            "linear-gradient(135deg,#EFF6FF,#E0F2FE,#ECFDF5)",
        }}
      >

        <Container maxWidth="lg">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}
          >

            <Box
              sx={{
                textAlign: "center",
                mb: 7,
              }}
            >

              <Chip
                label="How It Works"
                sx={{
                  bgcolor: "rgba(14,165,233,.1)",
                  color: "#0284C7",
                  fontWeight: 700,
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight={800}
              >
                3 Simple Steps
              </Typography>

            </Box>

          </motion.div>


          <Grid
            container
            spacing={4}
            justifyContent="center"
          >

            {[
              {
                n: "01",
                title: "Create Account",
                desc: "Register as a patient or doctor in under 2 minutes.",
                color: "#0EA5E9",
              },

              {
                n: "02",
                title: "Find Your Doctor",
                desc: "Search specialists by condition, view availability and book instantly.",
                color: "#8B5CF6",
              },

              {
                n: "03",
                title: "Heal & Recover",
                desc: "Attend your appointment, get diagnosis, and access your records anytime.",
                color: "#14B8A6",
              },
            ].map((item, i) => (

              <Grid
                size={{
                  xs: 12,
                  sm: 4,
                }}
                key={item.n}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: i * 0.15,
                  }}
                >

                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                    }}
                  >

                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2.5,

                        background:
                          `linear-gradient(135deg,${item.color},${item.color}99)`,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        boxShadow:
                          `0 8px 24px ${item.color}40`,
                      }}
                    >

                      <Typography
                        fontWeight={900}
                        color="#fff"
                        fontSize={24}
                      >
                        {item.n}
                      </Typography>

                    </Box>


                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mb={1}
                    >
                      {item.title}
                    </Typography>


                    <Typography
                      color="text.secondary"
                      lineHeight={1.7}
                    >
                      {item.desc}
                    </Typography>

                  </Box>

                </motion.div>

              </Grid>

            ))}

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
          CTA
      ===================================================== */}

      <Box
        sx={{
          py: 10,

          background:
            "linear-gradient(135deg,#0EA5E9,#06B6D4,#14B8A6)",
        }}
      >

        <Container maxWidth="md">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}
          >

            <Box
              sx={{
                textAlign: "center",
              }}
            >

              <Typography
                variant="h3"
                fontWeight={900}
                color="#fff"
                mb={2}
              >
                Ready to Transform Your Healthcare?
              </Typography>


              <Typography
                color="rgba(255,255,255,.85)"
                fontSize="1.1rem"
                mb={5}
                sx={{
                  maxWidth: 480,
                  mx: "auto",
                }}
              >
                Join 50,000+ patients and 500+ doctors
                who trust MediNova for better health outcomes.
              </Typography>


              <Button
                size="large"
                onClick={goDashboard}
                sx={{
                  bgcolor: "#fff",
                  color: "#0EA5E9",
                  fontWeight: 700,
                  px: 6,
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1.05rem",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.92)",
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,.2)",
                  },

                  transition: "all .3s",
                }}
              >

                {isAuthenticated
                  ? "Go to Dashboard"
                  : "Start for Free →"}

              </Button>

            </Box>

          </motion.div>

        </Container>

      </Box>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <PublicFooter />

    </Box>

  );
}