"use client";
import "./register.styles.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DecodeToken } from "@/app/utils/decode-jwt-token/DecodeToken";
import WelcomeBackComponent from "@/app/components/welcomeBack/page";
import StepsBar from "@/app/components/steps/horizontallySteps/page";
import FirstStep from "@/app/components/Forms/register-steps/step-1/page";
import SecondStep from "@/app/components/Forms/register-steps/step-2/page";
import ThirdStep from "@/app/components/Forms/register-steps/step-3/page";
import Loader from "@/app/components/loader/page";
import { registerRoute } from "@/app/api/routes/routesEndpoints";
const Register = () => {
  const {data:session} = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [loading,setLoading] = useState(true);
  const [userData,setUserData] = useState({
    step1:{},
    step2:{},
    step3:{}
  })
  const [StepsVerifier,setStepsVerifier] = useState([
    {step1:false},
    {step2:false},
    {step3:false},
  ])
  const [stepsDone,setStepsDone]=useState(false);
  const router = useRouter();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };


  const handleSubmitFirst = (data)=>{
    setUserData(userData => ({
      ...userData,
      step1: data
    }));

   setStepsVerifier((step)=>[
    {...step[0],step1:true},
    
   ])


    nextStep();
  }

  const handleSubmitSecond = (data)=>{
    setUserData(userData => ({
      ...userData,
      step2: data
    }));
    setStepsVerifier((step)=>[
      {...step[0],step2:true},
     ])
     nextStep();
    
  }
  const handleSubmitThird = (data)=>{
    setUserData(userData => ({
      ...userData,
      step3: data
    }));
    setStepsVerifier((step)=>[
      {...step[0],step3:true},
     ])
    setStepsDone(false)
   }
 
 useEffect(()=>{

  const CreateUser = async() =>{
    if(stepsDone){
      const res = await registerRoute(userData,session.token);
      console.log(res)
     }
  }
  CreateUser();

 },[stepsDone])

  const handleSignOut = async () => {
    await signOut();
  };




  useEffect(() => {
    const decodeToken = async (session) => {
      if (session) {
        const decodedUsername = await DecodeToken(session);
        setUserName(decodedUsername);
        setLoading(false);
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

      <StepsBar StepsVerifier={StepsVerifier} nextStep={nextStep} previousStep={previousStep} currentStep={currentStep} listNmbers={3} StepsNames={['Informations', 'Company', 'Stack']} />
      {loading && <Loader />}
      <div class="row col-md-12 col-lg-9 col-12 h-75 m-auto d-flex flex-row justify-content-between shadow rounded-4">
    <div class="col-lg-6 col-md-4 d-none d-lg-flex justify-content-start align-items-center position-relative register-section-background rounded-4">
        {userName && <WelcomeBackComponent username={userName} size={'display-6'} />}
    </div>

    <div class="col-lg-6 h-100 bg-soft-tertiary-color rounded d-flex justify-content-center align-items-center flex-column rounded-end-4" id="register-area">
        <div class="w-100 h-100 m-auto d-flex justify-content-center align-items-center col-md-10 col-lg-8 col-xl-6">
            {currentStep === 1 && <FirstStep onSubmit={handleSubmitFirst} />}
            {currentStep === 2 && <SecondStep onSubmit={handleSubmitSecond} />} 
            {currentStep === 3 && <ThirdStep onSubmit={handleSubmitThird}  />}
        </div>
    </div>
</div>
    
    </section>
  );
};

export default Register;
