import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, CircularProgress, Alert, Autocomplete, TextField, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdBiotech, MdWarning, MdRefresh, MdLocalHospital, MdInfo, MdCheckCircle } from 'react-icons/md';
import { predictDisease } from '../../api';
import Layout from '../../components/Layout';

const SYMPTOMS = ['itching','skin rash','continuous sneezing','shivering','chills','joint pain','stomach pain','acidity','vomiting','fatigue','weight gain','anxiety','cold hands and feet','mood swings','weight loss','restlessness','lethargy','cough','high fever','breathlessness','sweating','dehydration','indigestion','headache','nausea','loss of appetite','back pain','constipation','abdominal pain','diarrhoea','mild fever','yellowing of eyes','malaise','phlegm','throat irritation','redness of eyes','sinus pressure','runny nose','congestion','chest pain','neck pain','dizziness','cramps','obesity','swollen legs','brittle nails','excessive hunger','slurred speech','knee pain','hip joint pain','muscle weakness','stiff neck','swelling joints','loss of balance','loss of smell','bladder discomfort','depression','irritability','muscle pain','red spots over body','palpitations','painful walking','pus filled pimples','blackheads','skin peeling','blister'];

const SEV_COLOR = { Low:'#22C55E', Medium:'#F59E0B', High:'#EF4444' };
const SEV_BG    = { Low:'#F0FDF4', Medium:'#FFFBEB', High:'#FEF2F2' };

export default function AiChecker() {
  const [selected,setSelected]=useState([]);
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  const handlePredict = async () => {
    if (selected.length < 2) { setError('Select at least 2 symptoms.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const symptoms = selected.map((s) => s.replace(/ /g, '_'));
      const res = await predictDisease(symptoms);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'AI prediction failed. Please try again.');
    } finally { setLoading(false); }
  };

  const reset = () => { setResult(null); setSelected([]); setError(''); };
  const sevColor = result?.severity ? SEV_COLOR[result.severity] || '#0EA5E9' : '#0EA5E9';
  const sevBg    = result?.severity ? SEV_BG[result.severity]    || '#F0F9FF' : '#F0F9FF';

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 780, mx: 'auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: 'center', mb: 4, p: 4, background: 'linear-gradient(135deg,#8B5CF6,#6366F1)', borderRadius: 4, color: '#fff', boxShadow: '0 8px 32px rgba(139,92,246,.3)' }}>
            <motion.div animate={{ rotate: [0,5,-5,0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
              <MdBiotech size={52} color="#fff" style={{ marginBottom: 12 }} />
            </motion.div>
            <Typography variant="h4" fontWeight={900} mb={1}>AI Symptom Checker</Typography>
            <Typography sx={{ opacity: .9, maxWidth: 480, mx: 'auto', fontSize: 15 }}>
              Select your symptoms and our trained Random Forest AI model will predict possible conditions.
            </Typography>
          </Box>
        </motion.div>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
          <Card sx={{ mb: 3, border: '1px solid #DDD6FE' }}>
            <CardContent sx={{ p: 3.5 }}>
              <Typography variant="h6" fontWeight={700} mb={.5}>Select Your Symptoms</Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>Type to search from 100+ symptoms. Select all you're experiencing.</Typography>

              <Autocomplete multiple options={SYMPTOMS} value={selected} onChange={(_, v) => { setSelected(v); setError(''); }}
                renderTags={(value, getTagProps) => value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} sx={{ bgcolor: '#EDE9FE', color: '#7C3AED', fontWeight: 600 }} />
                ))}
                renderInput={(params) => <TextField {...params} placeholder="Type symptom (e.g. fever, headache, cough)…" />}
                sx={{ mb: 2 }} />

              {selected.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <MdCheckCircle color="#22C55E" size={15} />
                  <Typography variant="body2" color="#059669" fontWeight={600}>{selected.length} symptom{selected.length > 1 ? 's' : ''} selected {selected.length < 2 && '— select at least 2'}</Typography>
                </Box>
              )}

              {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

              <motion.div whileTap={{ scale: .98 }}>
                <Button variant="contained" fullWidth size="large" onClick={handlePredict} disabled={loading || selected.length < 2}
                  sx={{ py: 1.7, background: 'linear-gradient(135deg,#8B5CF6,#6366F1)', '&:hover': { background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', boxShadow: '0 8px 24px rgba(139,92,246,.4)' }, borderRadius: 2.5, fontWeight: 700, fontSize: '1rem' }}>
                  {loading ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><CircularProgress size={22} color="inherit" />Analyzing {selected.length} symptoms…</Box>
                           : <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><MdBiotech size={22} />Analyze with AI ({selected.length} symptoms)</Box>}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
              <Alert severity="warning" icon={<MdWarning />} sx={{ mb: 3 }}>
                <strong>Disclaimer:</strong> This is an AI prediction for informational purposes only. Always consult a qualified doctor.
              </Alert>
              <Card sx={{ mb: 2, border: '2px solid #8B5CF6', borderRadius: 4 }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, pb: 2.5, borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={800} letterSpacing={1.5} display="block" mb={.5}>PREDICTED CONDITION</Typography>
                      <Typography variant="h5" fontWeight={900} color="#7C3AED">{result.predicted_disease}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={800} letterSpacing={1.5} display="block" mb={.5}>SEVERITY</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: sevBg, borderRadius: 2, border: `1px solid ${sevColor}25` }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: sevColor }} />
                        <Typography fontWeight={800} color={sevColor} fontSize={15}>{result.severity}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {result.description && (
                    <Box sx={{ p: 2.5, bgcolor: '#F5F3FF', borderRadius: 2.5, mb: 2.5, border: '1px solid #DDD6FE' }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: .8 }}><MdInfo size={16} color="#8B5CF6" /><Typography variant="caption" color="#7C3AED" fontWeight={800} letterSpacing={1}>ABOUT THIS CONDITION</Typography></Box>
                      <Typography variant="body2" color="#475569" lineHeight={1.7}>{result.description}</Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5, bgcolor: '#EFF6FF', borderRadius: 2.5, border: '1px solid #BAE6FD', mb: 2.5 }}>
                    <Box sx={{ width: 46, height: 46, bgcolor: '#E0F2FE', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MdLocalHospital size={24} color="#0EA5E9" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={800} letterSpacing={1} display="block">SEE A SPECIALIST</Typography>
                      <Typography fontWeight={800} color="#0284C7" fontSize={17}>{result.recommended_specialization}</Typography>
                    </Box>
                  </Box>

                  {result.precautions?.filter(Boolean).length > 0 && (
                    <Box>
                      <Typography variant="body2" fontWeight={800} mb={1.5} color="#0F172A" letterSpacing={.5}>RECOMMENDED PRECAUTIONS:</Typography>
                      <Grid container spacing={1}>
                        {result.precautions.filter(Boolean).map((p, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#8B5CF6', mt: .8, flexShrink: 0 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{p}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Button variant="outlined" fullWidth startIcon={<MdRefresh />} onClick={reset}
                sx={{ py: 1.4, borderColor: '#8B5CF6', color: '#8B5CF6', borderRadius: 2.5, fontWeight: 700, '&:hover': { bgcolor: '#F5F3FF', borderColor: '#7C3AED' } }}>
                Check Again with Different Symptoms
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Layout>
  );
}