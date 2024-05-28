import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import LoginSquares from '@/../public/images/login-squares.svg';
import { Header } from '@/app/(auth)/_components/Header';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (user){
    if(user.profile.role){
      redirect('/dashboard');
    }else if(user.profile.role === null){
      redirect('/pending');
    }
  }
    
    

  return (
    <section>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12 position-relative">
            <Image
              src={LoginSquares}
              alt="square"
              width={100}
              className="position-absolute top-0 end-0"
            />
            <div className="row m-auto position-relative my-4 col-11 shadow rounded-1 bg-white z-1">
              <div className="login-registration-container d-flex flex-column align-items-center justify-content-around col-11 m-auto p-2">
                {children}
                <p className="text-center col-xl-8 col-lg-8 col-md-8 col-12">
                  By continuing, you agree to Pixelabs's <b>terms</b> of use and{' '}
                  <b>privacy policy</b>.
                </p>
              </div>
            </div>
            <Image
              src={LoginSquares}
              alt="square"
              width={100}
              className="position-absolute bottom-0 start-0 custom-rotate-180"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
