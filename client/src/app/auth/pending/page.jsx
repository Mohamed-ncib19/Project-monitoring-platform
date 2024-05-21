'use client'
import './pending.styles.css'
import HeaderLogo from '../../../layout/header-Logo/page';
import { DecodeToken } from '../../../utils/auth/DecodeToken';
import { CheckIcon } from '../../../public/icons/check-icon';
import submitedIllustration from '../../../public/registration-submited-illustration.svg';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../../components/buttons/simple-button/page';

const Pending = () => {
    const {data : session} = useSession();
    const [username,setUserName] = useState('');
    const router = useRouter();
    
    useEffect(()=>{
      const decodeToken = (session)=>{
        const decoded = DecodeToken(session?.token)
        if(decoded){
          setUserName(decoded.username);
        }else{
          router.push('/auth/login');
        }
      }

      if(session /*  && session.user.exists */){
        decodeToken(session);
      }

    },[session])

  const handleSignOut = async () => {
    await signOut();
  };
    return ( 
        
        <div className=" vh-100 " >
          <HeaderLogo /> 
          <div className=' d-flex flex-column gap-2 justify-content-center align-items-center custom-letter-spacing-wider pending-content' >
            <Image
            src={submitedIllustration}
            width={400}
            alt='submited'
            />
            <p className='d-flex gap-2 justify-content-center align-items-center' >
              <i className='check-icon text-white rounded-2 px-1 h2'><CheckIcon /></i>
              <span className='h3 fw-bold' >Registration Submitted!</span>
            </p>
            <p className=' fw-normal' > Your registration is under review, you will be in soon.</p>
            <div className=' col-xl-8 col-lg-10 col-12' >
            <Button content={'Sign Out'} onClick={handleSignOut}   />
            </div>
          </div>
       
        </div>
     );
}
 
export default Pending;