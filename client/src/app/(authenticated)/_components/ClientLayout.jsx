'use client';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';

const endpointUrl = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
axios.defaults.baseURL = endpointUrl;
const ClientLayout = ({ children, data }) => {
  const session = useSession();
  if (!axios.defaults.headers.common.Authorization) {
    axios.defaults.headers.common = {
      Authorization: ` ${data?.accessToken}`,
    };

    axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        if(err?.request.status === 403 && JSON.parse(err?.request.response)?.error === 'Banned'){
              await signOut({ redirect: true });
          
        }
        const originalConfig = err.config;
        if (err.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          const newSession = await session.update();
          if (newSession?.error) {
            await signOut({ redirect: false });
          } else {
            originalConfig.headers['Authorization'] =
              `${newSession?.accessToken?.token}`;
            axios.defaults.headers.common = {
              Authorization: `${newSession?.accessToken?.token}`,
            };
            return axios(originalConfig);
          }
        }/* else if(err?.request.status === 401){
          await signOut({redirect : true});
        } */
        return Promise.reject(err);
      },
    );
  }
  return children;
};

export default ClientLayout;