import { createContext, useContext, useEffect, useState } from 'react';
import api, { API_URL, ensureCsrfCookie } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const { data } = await api.get('/api/user');
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    await ensureCsrfCookie();
    await api.post('/api/login', { email, password });
    await refreshUser();
  }

  async function register(name, email, password, passwordConfirmation) {
    await ensureCsrfCookie();
    await api.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    await refreshUser();
  }

  async function logout() {
    await api.post('/api/logout');
    setUser(null);
  }

  function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google/redirect`;
  }

  async function resendVerification() {
    const { data } = await api.post('/api/email/verification-notification');
    return data.message;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        resendVerification,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
