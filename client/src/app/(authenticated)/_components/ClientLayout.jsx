'use client';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';

const endpointUrl = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
axios.defaults.baseURL = endpointUrl;
const ClientLayout = ({ children, data }) => {
  const session = useSession();
  if (!axios.defaults.headers.common.Authorization) {
    axios.defaults.headers.common = {
      Authorization: `${data?.accessToken}`,
    };


    axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
    axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalConfig = err.config;
        console.log(originalConfig);
        if (err.response?.status === 401 && originalConfig._retry) {
          originalConfig._retry = true;
          const newSession = await session.update();
          if (newSession?.error) {
            await signOut({ redirect: false });
          } else {
            originalConfig.headers['Authorization'] =
              `Bearer ${newSession?.accessToken?.token}`;
            axios.defaults.headers.common = {
              Authorization: `Bearer ${newSessfhVyUoG-I-yRkUS0Jr801nL3i4GpqHQqVUv4IUAaMsion?.accessToken?.token}`,
            };
            return axios(originalConfig);
          }
        }
        return Promise.reject(err);
      },
    );
  }
  return children;
};

export default ClientLayout;