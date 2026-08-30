// import React from 'react';
// import {
//   Box, Container, Typography, Grid, Card, CardContent, Chip, Button,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import {
//   MdBiotech, MdCalendarToday, MdShield, MdPeople,
//   MdMedicalServices, MdNotifications, MdHistory, MdAnalytics,
// } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import PublicNavbar from '../../components/PublicNavbar';
// import PublicFooter from '../../components/PublicFooter';

// const ALL_FEATURES = [
//   { icon: MdBiotech,         color:'#8B5CF6', bg:'#F5F3FF', title:'AI Symptom Checker',        desc:'Our trained Random Forest ML model analyzes your symptoms and predicts possible conditions with confidence scores and recommended specialists.' },
//   { icon: MdCalendarToday,   color:'#0EA5E9', bg:'#EFF6FF', title:'Smart Appointment Booking',  desc:'Book appointments in 3 simple steps. Select doctor, pick date and time slot, confirm. Real-time availability with instant notifications.' },
//   { icon: MdPeople,          color:'#14B8A6', bg:'#F0FDFA', title:'500+ Verified Doctors',      desc:'Access verified specialists across 20+ medical disciplines. View ratings, experience, hospital affiliations and consultation fees.' },
//   { icon: MdShield,          color:'#22C55E', bg:'#F0FDF4', title:'Secure Medical Records',     desc:'All your health data encrypted with AES-256. HIPAA compliant. Your medical records are private and accessible only to you and your doctor.' },
//   { icon: MdMedicalServices, color:'#F59E0B', bg:'#FFFBEB', title:'Digital Prescriptions',      desc:'Doctors can upload digital prescriptions directly to your profile. Download, print, or share with pharmacies anytime.' },
//   { icon: MdNotifications,   color:'#EF4444', bg:'#FEF2F2', title:'Smart Notifications',        desc:'Get real-time notifications for appointment confirmations, reminders, cancellations, and doctor notes right in the app.' },
//   { icon: MdHistory,         color:'#06B6D4', bg:'#ECFEFF', title:'Complete Medical History',   desc:'Keep track of all past appointments, diagnoses, prescriptions, and lab results in one organized dashboard.' },
//   { icon: MdAnalytics,       color:'#8B5CF6', bg:'#F5F3FF', title:'Health Analytics',           desc:'Visual dashboards showing your health trends, appointment history, and AI-powered health insights over time.' },
// ];

// export default function FeaturesPage() {
//   const navigate = useNavigate();
//   return (
//     <Box sx={{ bgcolor:'#F8FAFC', minHeight:'100vh' }}>
//       <PublicNavbar />

//       {/* Hero */}
//       <Box sx={{ py:10, background:'linear-gradient(135deg,#EFF6FF,#E0F2FE)', textAlign:'center' }}>
//         <Container maxWidth="md">
//           <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
//             <Chip label="Platform Features" sx={{ bgcolor:'rgba(14,165,233,.1)', color:'#0284C7', fontWeight:700, mb:2 }} />
//             <Typography variant="h2" fontWeight={900} mb={2}>
//               Everything You Need for{' '}
//               <Box component="span" className="gradient-text">Better Healthcare</Box>
//             </Typography>
//             <Typography color="text.secondary" fontSize="1.1rem" maxWidth={560} mx="auto">
//               MediNova brings together AI, expert doctors, and modern technology to give you the best healthcare experience.
//             </Typography>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* Features Grid */}
//       <Container maxWidth="lg" sx={{ py:10 }}>
//         <Grid container spacing={3}>
//           {ALL_FEATURES.map((f, i) => (
//             <Grid item xs={12} sm={6} md={6} key={f.title}>
//               <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }} whileHover={{ y:-4 }}>
//                 <Card sx={{ height:'100%' }}>
//                   <CardContent sx={{ p:4 }}>
//                     <Box sx={{ display:'flex', alignItems:'flex-start', gap:3 }}>
//                       <Box sx={{ width:64, height:64, borderRadius:3, bgcolor:f.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
//                         <f.icon size={32} color={f.color} />
//                       </Box>
//                       <Box>
//                         <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
//                         <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ textAlign:'center', mt:8 }}>
//           <Typography variant="h5" fontWeight={700} mb={2}>Ready to experience MediNova?</Typography>
//           <Box sx={{ display:'flex', gap:2, justifyContent:'center', flexWrap:'wrap' }}>
//             <Button variant="contained" size="large" onClick={() => navigate('/register')} sx={{ px:5, py:1.5, borderRadius:3 }}>
//               Get Started Free
//             </Button>
//             <Button variant="outlined" size="large" onClick={() => navigate('/home')} sx={{ px:5, py:1.5, borderRadius:3 }}>
//               Back to Home
//             </Button>
//           </Box>
//         </Box>
//       </Container>

//       <PublicFooter />
//     </Box>
//   );
// }/


import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';

import { motion } from 'framer-motion';

import {
  MdBiotech,
  MdCalendarToday,
  MdShield,
  MdPeople,
  MdMedicalServices,
  MdNotifications,
  MdHistory,
  MdAnalytics,
} from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import PublicNavbar from '../../components/PublicNavbar';
import PublicFooter from '../../components/PublicFooter';


const ALL_FEATURES = [
  {
    icon: MdBiotech,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'AI Symptom Checker',
    desc: 'AI analyzes your symptoms and predicts possible conditions with recommended specialists.',
  },

  {
    icon: MdCalendarToday,
    color: '#0EA5E9',
    bg: '#EFF6FF',
    title: 'Smart Appointment Booking',
    desc: 'Select a doctor, choose a date and time slot, and book your appointment instantly.',
  },

  {
    icon: MdPeople,
    color: '#14B8A6',
    bg: '#F0FDFA',
    title: '500+ Verified Doctors',
    desc: 'Connect with verified specialists across multiple medical disciplines.',
  },

  {
    icon: MdShield,
    color: '#22C55E',
    bg: '#F0FDF4',
    title: 'Secure Medical Records',
    desc: 'Your medical information is securely stored and accessible only to authorized users.',
  },

  {
    icon: MdMedicalServices,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Digital Prescriptions',
    desc: 'Access your digital prescriptions anytime directly from your healthcare dashboard.',
  },

  {
    icon: MdNotifications,
    color: '#EF4444',
    bg: '#FEF2F2',
    title: 'Smart Notifications',
    desc: 'Receive reminders and updates about appointments and important doctor notifications.',
  },

  {
    icon: MdHistory,
    color: '#06B6D4',
    bg: '#ECFEFF',
    title: 'Complete Medical History',
    desc: 'View appointments, diagnoses, prescriptions, and health records in one place.',
  },

  {
    icon: MdAnalytics,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Health Analytics',
    desc: 'Understand your health trends with useful analytics and AI-powered insights.',
  },
];


export default function FeaturesPage() {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        bgcolor: '#F8FAFC',
        minHeight: '100vh',
      }}
    >

      {/* NAVBAR */}
      <PublicNavbar />


      {/* HERO SECTION */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          background:
            'linear-gradient(135deg,#EFF6FF,#E0F2FE,#ECFDF5)',
          textAlign: 'center',
        }}
      >

        <Container maxWidth="md">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <Chip
              label="Platform Features"
              sx={{
                bgcolor: 'rgba(14,165,233,.1)',
                color: '#0284C7',
                fontWeight: 700,
                mb: 2,
              }}
            />

            <Typography
              variant="h2"
              fontWeight={900}
              mb={2}
              sx={{
                fontSize: {
                  xs: '2rem',
                  sm: '2.6rem',
                  md: '3.2rem',
                },
              }}
            >

              Everything You Need for{' '}

              <Box
                component="span"
                className="gradient-text"
              >
                Better Healthcare
              </Box>

            </Typography>


            <Typography
              color="text.secondary"
              fontSize="1.05rem"
              maxWidth={560}
              mx="auto"
              lineHeight={1.7}
            >
              MediNova brings together AI, expert doctors, and
              modern technology to give you the best healthcare
              experience.
            </Typography>

          </motion.div>

        </Container>

      </Box>


      {/* FEATURES SECTION */}

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 6, md: 8 },
        }}
      >

        {/* 
          IMPORTANT:
          CSS GRID = 4 CARDS PER ROW
        */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },

            gap: 3,

            width: '100%',
          }}
        >

          {ALL_FEATURES.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -6,
                }}
                style={{
                  height: '100%',
                }}
              >

                <Card
                  sx={{
                    height: '100%',
                    minHeight: 235,

                    borderRadius: 4,

                    border:
                      '1px solid rgba(226,232,240,0.9)',

                    boxShadow:
                      '0 6px 20px rgba(15,23,42,0.06)',

                    transition:
                      'all 0.3s ease',

                    display: 'flex',

                    '&:hover': {
                      boxShadow:
                        '0 14px 35px rgba(15,23,42,0.12)',
                    },
                  }}
                >

                  <CardContent
                    sx={{
                      p: 3,

                      width: '100%',

                      display: 'flex',

                      flexDirection: 'column',
                    }}
                  >

                    {/* ICON */}

                    <Box
                      sx={{
                        width: 52,
                        height: 52,

                        borderRadius: 3,

                        bgcolor: feature.bg,

                        display: 'flex',

                        alignItems: 'center',

                        justifyContent: 'center',

                        mb: 2,
                      }}
                    >

                      <Icon
                        size={27}
                        color={feature.color}
                      />

                    </Box>


                    {/* TITLE */}

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: '1.05rem',
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>


                    {/* DESCRIPTION */}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        fontSize: '0.88rem',
                      }}
                    >
                      {feature.desc}
                    </Typography>

                  </CardContent>

                </Card>

              </motion.div>

            );

          })}

        </Box>


        {/* CTA */}

        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            mb: 2,
          }}
        >

          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
          >
            Ready to experience MediNova?
          </Typography>


          <Typography
            color="text.secondary"
            mb={3}
          >
            Start your smarter healthcare journey today.
          </Typography>


          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Get Started Free
            </Button>


            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/home')}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 3,
                borderColor: '#0EA5E9',
                color: '#0EA5E9',
                fontWeight: 700,

                '&:hover': {
                  bgcolor: 'rgba(14,165,233,.06)',
                  borderColor: '#0284C7',
                },
              }}
            >
              Back to Home
            </Button>

          </Box>

        </Box>

      </Container>


      {/* FOOTER */}

      <PublicFooter />

    </Box>

  );
}