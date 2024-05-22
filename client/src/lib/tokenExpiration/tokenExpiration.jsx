'use client';
import { GetNewToken } from '../../utils/auth/GetNewToken';
import { DecodeToken } from '../../utils/auth/DecodeToken';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { CheckTokenExp } from '../../utils/auth/CheckTokenExp';

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
            const decodedRefreshToken = await DecodeToken(
              sessionData.refreshToken,
            );
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
