"use client";
import WelcomeBackComponent from "@/app/components/welcomeBack/page";
import "./register.styles.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DecodeToken } from "@/app/utils/decode-jwt-token/DecodeToken";
import FirstStep from "@/app/components/Forms/register-steps/step-1/page";
import StepsBar from "@/app/components/steps/horizontallySteps/page";
const Register = () => {
  const {data:session} = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const onSubmit = (data) =>{
    console.log(data)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep onSubmit={onSubmit} />;
      /* case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />; */
      default:
        return <FirstStep />;
    }
  };

  useEffect(() => {
    const decodeToken = async (session) => {
      if (session) {
        const decodedUsername = await DecodeToken(session);
        setUserName(decodedUsername);
      }
    };

    if (session) {
      decodeToken(session);
      if (session.user.exists) {
        router.push('/');
      }
    }
}, [session, router]);

  return (
    <section className="d-flex flex-column justify-content-center align-items-center vh-100">
      <button onClick={handleSignOut}>Sign out</button>

      <StepsBar listNmbers={3} StepsNames={['Informations', 'Company', 'Stack']} currentStep={currentStep} />
      <div className="row col-md-12 col-lg-9 col-12 h-75 m-auto shadow rounded-4">
        <div className="col position-relative d-none d-lg-flex justify-content-start align-items-center register-section-background rounded-4">
          {userName && <WelcomeBackComponent username={userName} size={'h3'} />}
        </div>

        <div className="col-sm-12 col-md-12 col-lg-6 col-12 bg-soft-tertiary-color rounded d-flex justify-content-start align-items-center flex-column rounded-end-4" id="register-area">
          <div className="row col">
            <p className="m-auto">Welcome! Please fill out the form below to create your account</p>
            {renderStep()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
