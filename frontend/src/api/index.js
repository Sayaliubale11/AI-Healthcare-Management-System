import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const API = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' }, timeout: 15000 });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) throw new Error('no refresh');
        const res = await axios.post(`${BASE}/accounts/refresh/`, { refresh });
        localStorage.setItem('access', res.data.access);
        orig.headers.Authorization = `Bearer ${res.data.access}`;
        return API(orig);
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── AUTH ─────────────────────────────────────────────
// POST /api/accounts/register/  body:{email,password,confirm_password,role,phone}
export const registerUser = (data) => API.post('/accounts/register/', data);
// POST /api/accounts/login/     body:{email,password}  → {access,refresh,email,role,user_id}
export const loginUser    = (data) => API.post('/accounts/login/', data);
// GET  /api/accounts/profile/   → User {id,email,role,phone,first_name,last_name,gender,dob,address,...}
// PUT  /api/accounts/profile/
export const getProfile    = ()     => API.get('/accounts/profile/');
export const updateProfile = (data) => API.put('/accounts/profile/', data);

// ─── PATIENTS ─────────────────────────────────────────
// GET /api/patients/profile/    → {id,user,blood_group,height,weight,emergency_contact,allergies,medical_history}
// PUT /api/patients/profile/
export const getPatientProfile    = ()     => API.get('/patients/profile/');
export const updatePatientProfile = (data) => API.put('/patients/profile/', data);

// ─── DOCTORS ──────────────────────────────────────────
// GET /api/doctors/             → [{id,doctor_name,specialization,qualification,experience,consultation_fee,hospital,available}]
export const getDoctors      = ()    => API.get('/doctors/');
export const getDoctorById   = (id)  => API.get(`/doctors/${id}/`);
// GET /api/doctors/<id>/slots/?date=YYYY-MM-DD  → ["09:00","09:30"]
export const getDoctorSlots  = (id, date) => API.get(`/doctors/${id}/slots/?date=${date}`);

// ─── APPOINTMENTS ─────────────────────────────────────
// GET  /api/appointments/       body→ patient sees own, doctor sees own
// POST /api/appointments/       body:{doctor,appointment_date,appointment_time,symptoms}
export const getAppointments   = ()     => API.get('/appointments/');
export const createAppointment = (data) => API.post('/appointments/', data);
// GET/PUT/DELETE /api/appointments/<id>/
export const getAppointmentById = (id)       => API.get(`/appointments/${id}/`);
export const updateAppointment  = (id, data) => API.put(`/appointments/${id}/`, data);
export const deleteAppointment  = (id)       => API.delete(`/appointments/${id}/`);
// GET  /api/appointments/doctor/
export const getDoctorAppointments = () => API.get('/appointments/doctor/');
// PATCH /api/appointments/<id>/status/  body:{status,doctor_notes}
export const updateAppointmentStatus = (id, data) => API.patch(`/appointments/${id}/status/`, data);

// ─── AI ───────────────────────────────────────────────
// POST /api/ai/predict/  body:{symptoms:[...]}
// → {predicted_disease,description,precautions,severity,recommended_specialization}
export const predictDisease = (symptoms) => API.post('/ai/predict/', { symptoms });

export default API;