import Image from 'next/image';

import Logo from '../../public/Logo.svg';
//import './header-logo.styles.css';

const HeaderLogo = () => {
  return (
    <div className="logo d-xl-block d-lg-block d-md-block d-sm-flex d-flex">
      <Image src={Logo} alt="Logo" width={150} className="m-4" />
    </div>
  );
};

export default HeaderLogo;
