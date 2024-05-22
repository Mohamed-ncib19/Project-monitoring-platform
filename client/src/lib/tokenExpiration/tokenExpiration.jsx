'use client';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { CheckTokenExp } from '../../utils/auth/CheckTokenExp';
import { DecodeToken } from '../../utils/auth/DecodeToken';
import { GetNewToken } from '../../utils/auth/GetNewToken';

const TokenExpiration = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const checkTokenExpiration = async (sessionData) => {
      console.log(sessionData);
      try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const decodedToken = await DecodeToken(sessionData.token);
        console.log(decodedToken);
        if (!CheckTokenExp(decodedToken.exp, currentTimestamp)) {
          if (sessionData.user && sessionData.user.exists) {
            const decodedRefreshToken = DecodeToken(sessionData.refreshToken);
            console.log(decodedRefreshToken);
            if (!CheckTokenExp(decodedRefreshToken.exp, currentTimestamp)) {
              await signOut();
            } else {
              const newToken = await GetNewToken(sessionData.refreshToken);
              console.log(newToken);
              sessionData.token = newToken;
            }
          } else {
            await signOut();
          }
        }
      } catch (error) {
        console.error('Error checking token expiration:', error);
        await signOut();
      }
    };

    if (session) {
      checkTokenExpiration(session);
    }
  }, [session]);

  return <>{children}</>;
};

export default TokenExpiration;
