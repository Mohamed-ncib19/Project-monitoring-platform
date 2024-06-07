import Image from 'next/image';

import Logo from '@/../../public/Logo/Logo.svg';

export const Header = () => {
  return (
    <div className="logo d-xl-block d-lg-block d-md-block d-sm-flex d-flex">
      <Image src={Logo} alt="Logo" width={150} loading='lazy' draggable={false} className="m-4" />
    </div>
  );
};
