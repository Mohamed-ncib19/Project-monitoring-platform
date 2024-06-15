'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { pagePermissions } from '@/providers/BasedRole/role';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedRole = sessionStorage.getItem('userRole');
      
      if (savedRole) {
        setRole(savedRole);
      } else {
        const user = await getSession();
        const userRole = user?.profile?.role;

        if (userRole) {
          setRole(userRole);
          sessionStorage.setItem('userRole', userRole);
        }
        
        }
      setAuthorized(true);
    };

    initializeAuth();
  }, []);

  const hasPermission = (page, action) => {
    if (!role || !pagePermissions[page]) return false;
    const allowedActions = pagePermissions[page][role];
    return allowedActions && allowedActions.includes(action);
  };

  return (
    <AuthContext.Provider value={{ role, hasPermission }}>
      {authorized && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
