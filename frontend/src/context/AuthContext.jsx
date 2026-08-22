import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kitabghar_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('kitabghar_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('Auth token expired or invalid:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (emailOrUsername, password) => {
    const res = await api.post('/auth/login', { emailOrUsername, password });
    if (res.data.success) {
      const { token: receivedToken, user: loggedUser } = res.data;
      setToken(receivedToken);
      setUser(loggedUser);
      localStorage.setItem('kitabghar_token', receivedToken);
      localStorage.setItem('kitabghar_user', JSON.stringify(loggedUser));
      return { success: true, user: loggedUser };
    }
    return { success: false, message: res.data.message };
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.data.success) {
      const { token: receivedToken, user: registeredUser } = res.data;
      setToken(receivedToken);
      setUser(registeredUser);
      localStorage.setItem('kitabghar_token', receivedToken);
      localStorage.setItem('kitabghar_user', JSON.stringify(registeredUser));
      return { success: true, user: registeredUser };
    }
    return { success: false, message: res.data.message };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('kitabghar_token');
    localStorage.removeItem('kitabghar_user');
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
