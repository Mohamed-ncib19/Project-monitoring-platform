'use client';
import './login-registarion.styles.css';
import LoginSquares from '../../public/login-squares.svg';
import Image from 'next/image';
import HeaderLogo from '../header-Logo/page';

const LoginRegistationLayout = ({ children }) => {
  return (
    <section>
      <HeaderLogo />

      <div className="container position-relative z-0    ">
        <div className="row justify-content-center ">
          <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12 position-relative">
            {' '}
            <Image
              src={LoginSquares}
              alt="square"
              width={100}
              className="position-absolute  top-0 end-0 z-0"
            />
            <div className="row m-auto position-relative  my-4 col-11 shadow rounded-1 bg-white  z-index-999  ">
              <div className=" login-registration-container d-flex flex-column align-items-center justify-content-around col-11 m-auto content-container p-2 ">
                {children}
                <p className=" legal-agreements text-center col-xl-8 col-lg-8 col-md-8 col-12">
                  By continuing, you agree to Pixelabs's <b>terms</b> of use and{' '}
                  <b>privacy policy</b>.
                </p>
              </div>
            </div>
            <Image
              src={LoginSquares}
              alt="square"
              width={100}
              className="position-absolute bottom-0 start-0 custom-rotate-180 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegistationLayout;
