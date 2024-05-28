'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';


import { CheckIcon } from '../../../public/icons/check-icon';
import submitedIllustration from '@/../../public/images/registration-submited-illustration.svg'
import CoreButton from '@/components/buttons/CoreButton';

const Pending = () => {

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className=" vh-100 ">
      <div className=" d-flex flex-column gap-2 justify-content-center align-items-center custom-letter-spacing-wider pending-content">
        <Image src={submitedIllustration} width={400} alt="submited" />
        <p className="d-flex gap-2 justify-content-center align-items-center">
          <i className="check-icon text-white rounded-2 px-1 h2">
            <CheckIcon />
          </i>
          <span className="h3 fw-bold">Registration Submitted!</span>
        </p>
        <p className=" fw-normal">
          {' '}
          Your registration is under review, you will be in soon.
        </p>
        <div className=" col-xl-8 col-lg-10 col-12">
          {<CoreButton
            type="button"
            label={'Sign Out'}
            onclick={handleSignOut}
          />}
        </div>
      </div>
    </div>
  );
};

export default Pending;