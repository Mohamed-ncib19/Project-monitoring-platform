'use client'
import Button from '@/app/components/buttons/simple-button/page';
import Logo from '@/public/Logo.svg'
import { LockIcon } from '@/public/icons/lock-icon';
import { signOut } from "next-auth/react";
import Image from 'next/image';

const Pending = () => {
    
  const handleSignOut = async () => {
    await signOut();
  };
    return ( 
        
        <div className=" vh-100 bg-soft-gray " >
          <div className='text-lg-start text-md-center text-sm-center text-xs-center text-center' >
            <Image
            src={Logo}
            className='h-auto'
            />
          </div>
            <div className=' h-50 justify-content-center d-flex  align-items-center flex-column gap-1 ' >
            <div className='  soft-bg-secondary-color p-5 h4 fw-medium rounded text-center text-light shadow ' >
              <LockIcon  />
              <div className='mt-4' >
              <p>Just waiting for the admin okay!</p>
              <p> Thanks for your patience!</p>
              </div>
              <Button content={'Sign Out'} onClick={handleSignOut}>Sign out</Button>
            </div>
            
            </div>
        </div>
     );
}
 
export default Pending;