import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    access_token: null,
    refresh_token: null,
    user_id: null,
  });

  const saveAuthData = (data) => {
    setAuthData(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  const navigate = useNavigate();

  const logout = () => {
    setAuthData({ access_token: null, refresh_token: null, user_id: null });
    localStorage.removeItem('authData');
    navigate('/login');
  };

  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, saveAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook для использования контекста
export const useAuth = () => useContext(AuthContext);
