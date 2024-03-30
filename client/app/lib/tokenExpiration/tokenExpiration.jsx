'use client'
import { refreshToken } from "@/app/api/routes/routesEndpoints";
import { DecodeToken } from "@/app/utils/auth/DecodeToken";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";


const TokenExpiration = ({ children }) => {
    const { data: session } = useSession();

    useEffect(() => {
        const checkTokenExpiration = async (session) => {
            const decoded = await DecodeToken(session.token);   
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (currentTimestamp >= decoded.exp) {
                const newToken =  await refreshToken(session.refreshToken);
                session.token = newToken;
            }
        };


        if (session) {
            checkTokenExpiration(session);
        }
    }, [session]);

    return <>{children}</>;
};

export default TokenExpiration;
