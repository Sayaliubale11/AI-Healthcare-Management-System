import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProfile } from '../api';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('access');
    if (!token) { setLoading(false); return; }
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const doLogin = (data) => {
    // data = { access, refresh, email, role, user_id }
    localStorage.setItem('access',  data.access);
    localStorage.setItem('refresh', data.refresh);
    setUser({ email: data.email, role: data.role, id: data.user_id });
  };

  const doLogout = () => { localStorage.clear(); setUser(null); };

  const refreshUser = async () => {
    try { const res = await getProfile(); setUser(res.data); } catch {}
  };

  return (
    <Ctx.Provider value={{ user, loading, isAuthenticated: !!user, role: user?.role, doLogin, doLogout, refreshUser, setUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be inside AuthProvider');
  return c;
};