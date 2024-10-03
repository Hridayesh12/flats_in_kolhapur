import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

// AuthProvider to manage user state and login modal
export const AuthProvider = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);   
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const openLogin = (callback) => {
    console.log("CallBack",callback);
      setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  return (
    <AuthContext.Provider value={{ loginOpen, setLoginOpen, closeLogin, openLogin, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
