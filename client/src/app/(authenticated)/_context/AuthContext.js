// AuthContext.js

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { pagePermissions } from '@/providers/BasedRole/role';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const user = await getSession();
      setRole(user?.profile?.role || null);
    };
    fetchSession();
  }, []);

  const hasPermission = (page, action) => {
    if (!role || !pagePermissions[page]) return false;
    const allowedActions = pagePermissions[page][role];
    return allowedActions && allowedActions.includes(action);
  };

  return (
    <AuthContext.Provider value={{ role, hasPermission }}>
      {children}
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
