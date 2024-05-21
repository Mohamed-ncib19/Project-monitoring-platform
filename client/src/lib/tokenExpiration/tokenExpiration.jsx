'use client'


import {GetNewToken} from "../../utils/auth/GetNewToken";
import { DecodeToken } from "../../utils/auth/DecodeToken";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { CheckTokenExp } from "../../utils/auth/CheckTokenExp";


const TokenExpiration = ({ children }) => {
    const { data: session } = useSession();

    useEffect(() => {
        const checkTokenExpiration = async (session) => {
            const decodedToken = await DecodeToken(session.token);
            const currentTimestamp = Math.floor(Date.now() / 1000);

            if(session.user.exists){
                const decodedRefreshToken = await DecodeToken(session.refreshToken);
                if(!CheckTokenExp(decodedRefreshToken.exp,currentTimestamp)){
                       signOut(); 
                }else{
                    if(!CheckTokenExp(decodedToken.exp,currentTimestamp)){
                        session.token = await GetNewToken(session.refreshToken);
                    }
                }
            }else{
                if(!CheckTokenExp(decodedToken.exp,currentTimestamp)){
                    signOut();
                }
            }

            
        };


        if (session) {
            checkTokenExpiration(session);
        }
    }, [session]);

    return <>{children}</>;
};

export default TokenExpiration;
