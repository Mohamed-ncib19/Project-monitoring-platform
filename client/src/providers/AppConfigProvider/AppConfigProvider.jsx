'use client';
import { SessionProvider } from 'next-auth/react';
import axios from 'axios';

const endpointUrl = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
axios.defaults.baseURL = endpointUrl;
export const AppConfigProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
