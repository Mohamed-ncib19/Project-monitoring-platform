"use client";
import Image from "next/image";
import illustartionBackground from "../../../public/login-3D-illustration-background.png";
import Logo from "../../../public/Logo.svg";
import "./login.styles.css";
import LoginForm from "../../components/Forms/login-Form/loginForm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [authorized , setAuthorized] = useState(false);

  useEffect(() => {
    if (session && session.user.exists) {    
           setAuthorized(true);

           setTimeout(()=>{
               router.push("/");
           },3000)
       
    } else if (session && !session.user.exists) {
        setAuthorized(true);
      setTimeout(() => {
          router.push("/auth/welcome");
    }, 2000);  
    }
  }, [session, router]);

 /*  if (session) {
    return <p>Redirecting...</p>;
  } */
  return (
    <section className="d-flex justify-content-center align-items-center vh-100 ">
      <div className=" row col-md-12 col-lg-9 col-xs-12 col-sm-12 col h-75 m-auto shadow rounded-4">
        <div
          className={`col-sm-12 col-md-12 col-xs-12 col-lg-6 col-xl bg-soft-tertiary-color rounded-start-4 d-flex justify-content-start align-items-center flex-column ${authorized ? 'd-none':''} `}
          id="login-area"
        >
          <div className=" row">
            <Image src={Logo} alt="Logo" className="m-auto col-12 w-auto" />
          </div>
          <LoginForm />
        </div>
        <div className={`col position-relative d-none rounded-end-4 d-lg-flex justify-content-end align-items-center login-section-background ${authorized ? 'login-success-animation ' : ''}  `}>
                <Image
                    className="position-absolute"
                    src={illustartionBackground}
                    width={300}
                    alt="Login Background Illustration"
                />
        </div>

      </div>
    </section>
  );
};

export default Login;
