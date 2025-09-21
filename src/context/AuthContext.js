import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('libraryUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // For demo purposes - in a real app, this would call an API
    if (email && password) {
      const user = {
        id: Date.now(),
        email,
        name: email.split('@')[0], // Simple name from email
        joinedDate: new Date().toISOString()
      };
      
      setCurrentUser(user);
      localStorage.setItem('libraryUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('libraryUser');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};