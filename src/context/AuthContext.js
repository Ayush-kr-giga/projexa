"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provide context to the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("projexa-user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("projexa-user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("projexa-user");
    setCurrentUser(null);
  };

  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context anywhere
export const useAuth = () => useContext(AuthContext);
