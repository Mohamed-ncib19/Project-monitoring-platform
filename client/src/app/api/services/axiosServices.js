import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';

const endpointUrl = process.env.NEXT_PUBLIC_ENDPOINTS_URL;

const axiosClient = axios.create({
  baseURL: endpointUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const configureAxios = (data) => {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data?.accessToken?.token}`;

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;
      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const session = useSession();
        const newSession = await session.update();
        if (newSession?.error) {
          await signOut({ redirect: false });
        } else {
          originalConfig.headers['Authorization'] = `Bearer ${newSession?.accessToken?.token}`;
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newSession?.accessToken?.token}`;
          return axiosClient(originalConfig);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosClient;