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
  MdPersonAdd,
  MdSearch,
  MdCalendarToday,
  MdVideoCall,
  MdDescription,
  MdFavorite,
} from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import PublicNavbar from '../../components/PublicNavbar';
import PublicFooter from '../../components/PublicFooter';


const PATIENT_STEPS = [
  {
    n: '01',
    icon: MdPersonAdd,
    color: '#0EA5E9',
    bg: '#EFF6FF',
    title: 'Create Your Account',
    desc: 'Register as a patient in under 2 minutes and get started with MediNova.',
  },

  {
    n: '02',
    icon: MdSearch,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Find the Right Doctor',
    desc: 'Browse verified specialists and filter by specialization, experience, or rating.',
  },

  {
    n: '03',
    icon: MdCalendarToday,
    color: '#14B8A6',
    bg: '#F0FDFA',
    title: 'Book an Appointment',
    desc: 'Choose your doctor, preferred date, and available time slot to book instantly.',
  },

  {
    n: '04',
    icon: MdVideoCall,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Attend Consultation',
    desc: 'Visit your doctor or attend a video consultation from the comfort of your home.',
  },

  {
    n: '05',
    icon: MdDescription,
    color: '#22C55E',
    bg: '#F0FDF4',
    title: 'Receive Prescription',
    desc: 'Get your digital prescription directly in your healthcare dashboard.',
  },

  {
    n: '06',
    icon: MdFavorite,
    color: '#EF4444',
    bg: '#FEF2F2',
    title: 'Track Your Health',
    desc: 'Manage appointments, medical history, prescriptions, and health records in one place.',
  },
];


export default function HowItWorksPage() {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        bgcolor: '#F8FAFC',
        minHeight: '100vh',
      }}
    >

      {/* ================= NAVBAR ================= */}

      <PublicNavbar />


      {/* ================= HERO ================= */}

      <Box
        sx={{
          py: {
            xs: 7,
            md: 9,
          },

          background:
            'linear-gradient(135deg,#EFF6FF,#E0F2FE,#ECFDF5)',

          textAlign: 'center',
        }}
      >

        <Container maxWidth="md">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <Chip
              label="Simple Process"
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

              How{' '}

              <Box
                component="span"
                className="gradient-text"
              >
                MediNova
              </Box>{' '}

              Works

            </Typography>


            <Typography
              color="text.secondary"
              fontSize="1.05rem"
              maxWidth={560}
              mx="auto"
              lineHeight={1.7}
            >
              Getting the best healthcare has never been easier.
              Follow these simple steps to get started.
            </Typography>

          </motion.div>

        </Container>

      </Box>


      {/* ================= STEPS ================= */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >

        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={5}
          sx={{
            fontSize: {
              xs: '1.7rem',
              md: '2.2rem',
            },
          }}
        >
          For Patients
        </Typography>


        {/* 
          CSS GRID
          Desktop = 3 cards per row
          Tablet  = 2 cards per row
          Mobile  = 1 card per row
        */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },

            gap: 3,

            width: '100%',
          }}
        >

          {PATIENT_STEPS.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={step.n}

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
                  delay: index * 0.06,
                }}

                whileHover={{
                  y: -5,
                }}

                style={{
                  height: '100%',
                }}
              >

                <Card
                  sx={{
                    height: '100%',

                    minHeight: 260,

                    borderRadius: 4,

                    border:
                      '1px solid rgba(226,232,240,0.9)',

                    boxShadow:
                      '0 6px 20px rgba(15,23,42,0.06)',

                    transition:
                      'all .3s ease',

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

                    {/* TOP ROW */}

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >

                      {/* ICON */}

                      <Box
                        sx={{
                          width: 54,
                          height: 54,

                          borderRadius: 3,

                          bgcolor: step.bg,

                          display: 'flex',

                          alignItems: 'center',

                          justifyContent: 'center',
                        }}
                      >

                        <Icon
                          size={28}
                          color={step.color}
                        />

                      </Box>


                      {/* STEP NUMBER */}

                      <Chip
                        label={`Step ${step.n}`}
                        size="small"
                        sx={{
                          bgcolor: `${step.color}15`,
                          color: step.color,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />

                    </Box>


                    {/* TITLE */}

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mb={1}
                      sx={{
                        fontSize: '1.05rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
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
                      {step.desc}
                    </Typography>

                  </CardContent>

                </Card>

              </motion.div>

            );

          })}

        </Box>


        {/* ================= CTA ================= */}

        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
          }}
        >

          <Typography
            variant="h5"
            fontWeight={700}
            mb={1.5}
          >
            Ready to get started?
          </Typography>


          <Typography
            color="text.secondary"
            mb={3}
          >
            Start your smarter healthcare journey with MediNova.
          </Typography>


          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              px: 5,
              py: 1.5,

              borderRadius: 3,

              fontSize: '1rem',

              fontWeight: 700,

              boxShadow:
                '0 8px 32px rgba(14,165,233,.35)',

              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow:
                  '0 12px 40px rgba(14,165,233,.45)',
              },

              transition: 'all .3s',
            }}
          >
            Start Your Journey Today →
          </Button>

        </Box>

      </Container>


      {/* ================= FOOTER ================= */}

      <PublicFooter />

    </Box>

  );
}