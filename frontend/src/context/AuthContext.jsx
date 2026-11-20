'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch, clearToken, getToken, setToken } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadMe() {
      if (!getToken()) return setLoading(false);
      try {
        const res = await apiFetch('/auth/me');
        if (!ignore) setAdmin(res.admin);
      } catch {
        clearToken();
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadMe();
    return () => {
      ignore = true;
    };
  }, []);

  async function login(email, password) {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setToken(res.token);
    setAdmin(res.admin);
    return res.admin;
  }

  function logout() {
    clearToken();
    setAdmin(null);
  }

  const value = useMemo(() => ({ admin, loading, login, logout, isLoggedIn: Boolean(admin) }), [admin, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
