// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Card, CardContent, Typography, Chip, CircularProgress, Avatar, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import { MdCalendarToday, MdPending, MdCheckCircle, MdPeople, MdAccessTime } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { getDoctorAppointments } from '../../api';
// import { useAuth } from '../../context/AuthContext';
// import Layout from '../../components/Layout';

// const SS = { PENDING:{bg:'#FEF3C7',color:'#D97706'}, APPROVED:{bg:'#D1FAE5',color:'#059669'}, COMPLETED:{bg:'#DBEAFE',color:'#2563EB'}, REJECTED:{bg:'#FEE2E2',color:'#DC2626'}, CANCELLED:{bg:'#F1F5F9',color:'#64748B'} };

// export default function DoctorDashboard() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [apts,setApts]=useState([]);
//   const [loading,setLoading]=useState(true);

//   useEffect(() => {
//     getDoctorAppointments()
//       .then((r) => setApts(Array.isArray(r.data) ? r.data : []))
//       .catch(() => {}).finally(() => setLoading(false));
//   }, []);

//   const today     = new Date().toISOString().split('T')[0];
//   const todayApts = apts.filter((a) => a.appointment_date === today);
//   const pending   = apts.filter((a) => a.status === 'PENDING');
//   const approved  = apts.filter((a) => a.status === 'APPROVED');
//   const completed = apts.filter((a) => a.status === 'COMPLETED');

//   const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening'; };

//   return (
//     <Layout>
//       <Box sx={{ p: { xs: 2, md: 3 } }}>
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//           <Box sx={{ mb: 4, p: 3, background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', borderRadius: 4, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, boxShadow: '0 8px 32px rgba(14,165,233,.3)' }}>
//             <Box>
//               <Typography variant="h5" fontWeight={800} mb={.5}>{greeting()}, Dr. {user?.first_name || user?.email?.split('@')[0]}! 👨‍⚕️</Typography>
//               <Typography sx={{ opacity: .9, fontSize: 14 }}>{todayApts.length > 0 ? `${todayApts.length} appointment${todayApts.length > 1 ? 's' : ''} today.` : 'No appointments today.'}</Typography>
//             </Box>
//             <Button onClick={() => navigate('/doctor/appointments')} sx={{ bgcolor: 'rgba(255,255,255,.2)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,.3)' }, borderRadius: 2.5, fontWeight: 700 }}>View All Appointments</Button>
//           </Box>
//         </motion.div>

//         <Grid container spacing={2.5} mb={4}>
//           {[{icon:MdCalendarToday,label:"Today's",value:todayApts.length,color:'#0EA5E9',delay:.1},{icon:MdPending,label:'Pending',value:pending.length,color:'#F59E0B',delay:.2},{icon:MdCheckCircle,label:'Approved',value:approved.length,color:'#22C55E',delay:.3},{icon:MdPeople,label:'Completed',value:completed.length,color:'#8B5CF6',delay:.4}].map(({icon:Icon,label,value,color,delay}) => (
//             <Grid item xs={6} md={3} key={label}>
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
//                 <Card sx={{ borderLeft: `4px solid ${color}`, bgcolor: `${color}06` }}>
//                   <CardContent sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Box><Typography variant="body2" color="text.secondary" fontWeight={600} fontSize={12}>{label}</Typography><Typography variant="h4" fontWeight={800} color={color}>{value}</Typography></Box>
//                     <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={22} color={color} /></Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>
//           <Card>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
//                 <Typography variant="h6" fontWeight={700}>Recent Appointments</Typography>
//                 <Button size="small" onClick={() => navigate('/doctor/appointments')} sx={{ color: '#0EA5E9', fontWeight: 600 }}>View All →</Button>
//               </Box>
//               {loading ? <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
//               : apts.length === 0 ? <Box sx={{ textAlign: 'center', py: 6 }}><MdCalendarToday size={52} color="#BAE6FD" /><Typography color="text.secondary" mt={2}>No appointments yet.</Typography></Box>
//               : apts.slice(0, 6).map((apt, i) => {
//                 const ss = SS[apt.status] || SS.PENDING;
//                 return (
//                   <motion.div key={apt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * .06 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', p: 1.8, mb: 1.5, borderRadius: 2.5, bgcolor: '#FAFBFE', border: '1px solid #F1F5F9', '&:hover': { borderColor: '#0EA5E9', bgcolor: '#F0F9FF' }, transition: 'all .2s' }}>
//                       <Avatar sx={{ bgcolor: '#E0F2FE', color: '#0284C7', mr: 2, width: 40, height: 40, fontWeight: 700, fontSize: 12 }}>P</Avatar>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={700}>Patient #{apt.patient}</Typography>
//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: .4 }}><MdCalendarToday size={11} color="#94A3B8" /><Typography variant="caption" color="text.secondary">{apt.appointment_date}</Typography></Box>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: .4 }}><MdAccessTime size={11} color="#94A3B8" /><Typography variant="caption" color="text.secondary">{apt.appointment_time?.slice(0,5)}</Typography></Box>
//                         </Box>
//                       </Box>
//                       <Chip label={apt.status} size="small" sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700, fontSize: 11 }} />
//                     </Box>
//                   </motion.div>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </Box>
//     </Layout>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Avatar,
  Button,
} from "@mui/material";

import { motion } from "framer-motion";

import {
  MdCalendarToday,
  MdPending,
  MdCheckCircle,
  MdPeople,
  MdAccessTime,
  MdArrowForward,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { getDoctorAppointments } from "../../api";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";


/* =========================================================
   STATUS COLORS
========================================================= */

const STATUS_STYLES = {
  PENDING: {
    bg: "#FEF3C7",
    color: "#D97706",
  },

  APPROVED: {
    bg: "#D1FAE5",
    color: "#059669",
  },

  COMPLETED: {
    bg: "#DBEAFE",
    color: "#2563EB",
  },

  REJECTED: {
    bg: "#FEE2E2",
    color: "#DC2626",
  },

  CANCELLED: {
    bg: "#F1F5F9",
    color: "#64748B",
  },
};


/* =========================================================
   STAT CARD DATA
========================================================= */

const getStats = (today, pending, approved, completed) => [
  {
    icon: MdCalendarToday,
    label: "Today's",
    value: today,
    color: "#0EA5E9",
  },

  {
    icon: MdPending,
    label: "Pending",
    value: pending,
    color: "#F59E0B",
  },

  {
    icon: MdCheckCircle,
    label: "Approved",
    value: approved,
    color: "#22C55E",
  },

  {
    icon: MdPeople,
    label: "Completed",
    value: completed,
    color: "#8B5CF6",
  },
];


/* =========================================================
   DOCTOR DASHBOARD
========================================================= */

export default function DoctorDashboard() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     LOAD APPOINTMENTS
  ======================================================= */

  const loadAppointments = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await getDoctorAppointments();

      console.log("Doctor appointments response:", response);

      /*
        Axios normally returns:

        {
          data: [...]
        }

        But this also supports a direct array.
      */

      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.results)
        ? response.data.results
        : [];

      setAppointments(data);

    } catch (err) {

      console.error(
        "Failed to load doctor appointments:",
        err
      );

      setAppointments([]);

      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Unable to load appointments."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =======================================================
     LOAD ON PAGE OPEN
  ======================================================= */

  useEffect(() => {

    loadAppointments();

  }, []);


  /* =======================================================
     TODAY'S DATE
  ======================================================= */

  const getTodayDate = () => {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const today = getTodayDate();


  /* =======================================================
     FILTER APPOINTMENTS
  ======================================================= */

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.appointment_date === today
  );


  const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "PENDING"
  );


  const approvedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "APPROVED"
  );


  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  );


  /* =======================================================
     GREETING
  ======================================================= */

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";
  };


  /* =======================================================
     DOCTOR NAME
  ======================================================= */

  const getDoctorName = () => {

    if (user?.first_name) {
      return user.first_name;
    }

    if (user?.name) {
      return user.name;
    }

    if (user?.email) {

      return user.email
        .split("@")[0]
        .replace(/[0-9]/g, "");
    }

    return "Doctor";
  };


  /* =======================================================
     APPOINTMENT TIME
  ======================================================= */

  const formatTime = (time) => {

    if (!time) {
      return "--";
    }

    return time.slice(0, 5);
  };


  /* =======================================================
     PATIENT DISPLAY
  ======================================================= */

  const getPatientName = (appointment) => {

    if (appointment.patient_name) {
      return appointment.patient_name;
    }

    if (appointment.patient?.name) {
      return appointment.patient.name;
    }

    if (appointment.patient?.email) {
      return appointment.patient.email;
    }

    if (appointment.patient) {
      return `Patient #${appointment.patient}`;
    }

    return "Patient";
  };


  /* =======================================================
     STATUS STYLE
  ======================================================= */

  const getStatusStyle = (status) => {

    return (
      STATUS_STYLES[status] ||
      STATUS_STYLES.PENDING
    );
  };


  /* =======================================================
     STATS
  ======================================================= */

  const stats = getStats(
    todayAppointments.length,
    pendingAppointments.length,
    approvedAppointments.length,
    completedAppointments.length
  );


  /* =======================================================
     UI
  ======================================================= */

  return (

    <Layout>

      <Box
        sx={{
          p: {
            xs: 2,
            md: 3,
          },

          maxWidth: 1400,

          mx: "auto",
        }}
      >

        {/* =================================================
            WELCOME HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <Box
            sx={{
              mb: 4,

              p: {
                xs: 2.5,
                md: 3,
              },

              background:
                "linear-gradient(135deg,#0EA5E9,#06B6D4)",

              borderRadius: 4,

              color: "#fff",

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              flexWrap: "wrap",

              gap: 2,

              boxShadow:
                "0 8px 32px rgba(14,165,233,.3)",
            }}
          >

            <Box>

              <Typography
                variant="h5"
                fontWeight={800}
                mb={0.5}
              >
                {getGreeting()}, Dr. {getDoctorName()}! 👨‍⚕️
              </Typography>

              <Typography
                sx={{
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                {todayAppointments.length > 0
                  ? `${todayAppointments.length} appointment${
                      todayAppointments.length > 1
                        ? "s"
                        : ""
                    } today.`
                  : "No appointments today."}
              </Typography>

            </Box>


            <Button
              onClick={() =>
                navigate("/doctor/appointments")
              }

              endIcon={<MdArrowForward />}

              sx={{
                bgcolor:
                  "rgba(255,255,255,.2)",

                color: "#fff",

                px: 2.5,

                py: 1.2,

                borderRadius: 2.5,

                fontWeight: 700,

                "&:hover": {
                  bgcolor:
                    "rgba(255,255,255,.3)",
                },
              }}
            >
              View All Appointments
            </Button>

          </Box>

        </motion.div>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <Grid
          container
          spacing={2.5}
          mb={4}
        >

          {stats.map(
            (
              {
                icon: Icon,
                label,
                value,
                color,
              },
              index
            ) => (

              <Grid
                item
                xs={6}
                md={3}
                key={label}
              >

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
                    delay:
                      0.1 +
                      index * 0.1,
                  }}
                >

                  <Card
                    sx={{
                      height: "100%",

                      borderLeft:
                        `4px solid ${color}`,

                      bgcolor:
                        `${color}06`,

                      borderRadius: 3,

                      transition:
                        "all .25s",

                      "&:hover": {
                        transform:
                          "translateY(-3px)",

                        boxShadow:
                          "0 8px 24px rgba(0,0,0,.08)",
                      },
                    }}
                  >

                    <CardContent
                      sx={{
                        p: {
                          xs: 2,
                          md: 2.5,
                        },

                        display: "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center",
                      }}
                    >

                      <Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                          fontSize={12}
                        >
                          {label}
                        </Typography>

                        <Typography
                          variant="h4"
                          fontWeight={800}
                          color={color}
                        >
                          {value}
                        </Typography>

                      </Box>


                      <Box
                        sx={{
                          width: 48,

                          height: 48,

                          borderRadius: 2.5,

                          bgcolor:
                            `${color}15`,

                          display: "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",
                        }}
                      >

                        <Icon
                          size={22}
                          color={color}
                        />

                      </Box>

                    </CardContent>

                  </Card>

                </motion.div>

              </Grid>

            )
          )}

        </Grid>


        {/* =================================================
            RECENT APPOINTMENTS
        ================================================= */}

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
            delay: 0.5,
          }}
        >

          <Card
            sx={{
              borderRadius: 3,
            }}
          >

            <CardContent
              sx={{
                p: {
                  xs: 2,
                  md: 3,
                },
              }}
            >

              {/* Header */}

              <Box
                sx={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  mb: 2.5,
                }}
              >

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Recent Appointments
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Latest patient appointments
                  </Typography>

                </Box>


                <Button
                  size="small"
                  onClick={() =>
                    navigate(
                      "/doctor/appointments"
                    )
                  }

                  sx={{
                    color: "#0EA5E9",

                    fontWeight: 600,
                  }}
                >
                  View All →
                </Button>

              </Box>


              {/* Loading */}

              {loading && (

                <Box
                  sx={{
                    textAlign: "center",

                    py: 6,
                  }}
                >

                  <CircularProgress
                    size={35}
                  />

                  <Typography
                    color="text.secondary"
                    mt={2}
                  >
                    Loading appointments...
                  </Typography>

                </Box>

              )}


              {/* Error */}

              {!loading && error && (

                <Box
                  sx={{
                    textAlign: "center",

                    py: 5,
                  }}
                >

                  <Typography
                    color="error"
                    mb={2}
                  >
                    {error}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={
                      loadAppointments
                    }
                  >
                    Try Again
                  </Button>

                </Box>

              )}


              {/* Empty */}

              {!loading &&
                !error &&
                appointments.length === 0 && (

                  <Box
                    sx={{
                      textAlign: "center",

                      py: 6,
                    }}
                  >

                    <MdCalendarToday
                      size={52}
                      color="#BAE6FD"
                    />

                    <Typography
                      color="text.secondary"
                      mt={2}
                    >
                      No appointments yet.
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Patient appointments will
                      appear here.
                    </Typography>

                  </Box>

                )}


              {/* Appointment List */}

              {!loading &&
                !error &&
                appointments.length > 0 && (

                  <Box>

                    {appointments
                      .slice(0, 6)
                      .map(
                        (
                          appointment,
                          index
                        ) => {

                          const status =
                            getStatusStyle(
                              appointment.status
                            );

                          return (

                            <motion.div
                              key={
                                appointment.id
                              }

                              initial={{
                                opacity: 0,
                                y: 10,
                              }}

                              animate={{
                                opacity: 1,
                                y: 0,
                              }}

                              transition={{
                                delay:
                                  index *
                                  0.06,
                              }}
                            >

                              <Box
                                sx={{
                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  p: 1.8,

                                  mb: 1.5,

                                  borderRadius:
                                    2.5,

                                  bgcolor:
                                    "#FAFBFE",

                                  border:
                                    "1px solid #F1F5F9",

                                  transition:
                                    "all .2s",

                                  "&:hover": {
                                    borderColor:
                                      "#0EA5E9",

                                    bgcolor:
                                      "#F0F9FF",
                                  },

                                  gap: 1.5,
                                }}
                              >

                                {/* Avatar */}

                                <Avatar
                                  sx={{
                                    bgcolor:
                                      "#E0F2FE",

                                    color:
                                      "#0284C7",

                                    width: 42,

                                    height: 42,

                                    fontWeight: 700,

                                    fontSize: 13,

                                    flexShrink: 0,
                                  }}
                                >
                                  P
                                </Avatar>


                                {/* Patient info */}

                                <Box
                                  sx={{
                                    flex: 1,

                                    minWidth: 0,
                                  }}
                                >

                                  <Typography
                                    variant="body2"
                                    fontWeight={700}
                                    noWrap
                                  >
                                    {getPatientName(
                                      appointment
                                    )}
                                  </Typography>


                                  <Box
                                    sx={{
                                      display:
                                        "flex",

                                      gap: 2,

                                      flexWrap:
                                        "wrap",

                                      mt: 0.3,
                                    }}
                                  >

                                    <Box
                                      sx={{
                                        display:
                                          "flex",

                                        alignItems:
                                          "center",

                                        gap: 0.4,
                                      }}
                                    >

                                      <MdCalendarToday
                                        size={11}
                                        color="#94A3B8"
                                      />

                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {
                                          appointment.appointment_date
                                        }
                                      </Typography>

                                    </Box>


                                    <Box
                                      sx={{
                                        display:
                                          "flex",

                                        alignItems:
                                          "center",

                                        gap: 0.4,
                                      }}
                                    >

                                      <MdAccessTime
                                        size={11}
                                        color="#94A3B8"
                                      />

                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {formatTime(
                                          appointment.appointment_time
                                        )}
                                      </Typography>

                                    </Box>

                                  </Box>

                                </Box>


                                {/* Status */}

                                <Chip
                                  label={
                                    appointment.status ||
                                    "PENDING"
                                  }

                                  size="small"

                                  sx={{
                                    bgcolor:
                                      status.bg,

                                    color:
                                      status.color,

                                    fontWeight: 700,

                                    fontSize: 11,

                                    flexShrink: 0,
                                  }}
                                />

                              </Box>

                            </motion.div>

                          );
                        }
                      )}

                  </Box>

                )}

            </CardContent>

          </Card>

        </motion.div>

      </Box>

    </Layout>
  );
}