'use client'
import './login.styles.css'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DecodeToken } from "@/app/utils/auth/DecodeToken";
import LoginForm from "../../components/Forms/login-Form/loginForm";
import Logo from "@/public/Logo.svg"
import IllustrationBackground from "@/public/login-3D-illustration-background.png"
const Login = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  

  useEffect(() => {
    if (session) {
      const decodedToken = DecodeToken(session.token);
      console.log(decodedToken.role);

      if (session.user.exists) {
        if (session.user.pending) {
          router.push("/auth/pending");
        } else {
          router.push('/');
        }
      } else {
        router.push("/auth/welcome");
      }
      setAuthorized(true);
    }
  }, [session, router]);

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="row col-md-12 col-lg-9 col-xs-12 col-sm-12 col h-75 m-auto shadow rounded-4">
        <div
          className={`col-sm-12 col-md-12 col-xs-12 col-lg-6 col-xl bg-soft-tertiary-color rounded-start-4 d-flex justify-content-start align-items-center flex-column ${authorized ? 'd-none' : ''} `}
          id="login-area"
        >
          <div className="row">
            <Image src={Logo} alt="Logo" className="m-auto col-12 w-auto" />
          </div>
          <LoginForm />
        </div>
        <div className={`col position-relative d-none rounded-end-4 d-lg-flex justify-content-end align-items-center login-section-background ${authorized ? 'login-success-animation ' : ''}  `}>
          <Image
            className="position-absolute col-6"
            src={IllustrationBackground}
            width={300}
            alt="Login Background Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
