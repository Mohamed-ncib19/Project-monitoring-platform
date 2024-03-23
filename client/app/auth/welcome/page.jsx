'use client'
import Button from "@/app/components/buttons/simple-button/page";
import WelcomeBackComponent from "@/app/components/welcomeBack/page";
import { DecodeToken } from "@/app/utils/decode-jwt-token/DecodeToken";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; 
const Welcome = () => {
    const { data: session } = useSession();
    const [username, setUserName] = useState(null);
    const [navLink,setNavLLink] = useState(null);
    const router = useRouter();

    useEffect(()=>{
       const decodeToken = async (session) =>{
        if (session) {
            const decodedUsername = await DecodeToken(session);
            setUserName(decodedUsername);
            if(session && session.user.exists){
                setNavLLink('/')
            }else{
                setNavLLink('/auth/register');
            }
        }
       };
       if(session){
       decodeToken(session);        
    }/* else{
        router.push('/auth/login')
    } */
       
    },[session])

    return ( 
        <div>
           
                 <section className="d-flex justify-content-center align-items-center vh-100  ">
                 <div className=" row col-md-12 col-lg-9 col-xs-12 col-sm-12 col h-75 m-auto shadow rounded-4  soft-bg-secondary-color ">
                    <div className="h-100 d-flex flex-column justify-content-center align-items-center gap-4  text-center p-8" >
                    <WelcomeBackComponent username={username} size={"display-5"} />
                    <p className="light-text-custom-color" >Just fill out the steps form below to Complete  your registration.</p>
                    <Button content={"Continue"} link={navLink} />
                    </div>
                 </div>
               </section>
            
                            
        </div>
     );
}
 
export default Welcome;
