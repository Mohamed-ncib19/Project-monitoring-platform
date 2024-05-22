'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LoginForm from '../../../components/Forms/login-Form/loginForm';
import RegistrationForm from '../../../components/Forms/register-Form/page';
import WelcomeBackComponent from '../../../components/welcomeBack/page';
import LoginRegistationLayout from '../../../layout/login-registartion/page';
import { DecodeToken } from '../../../utils/auth/DecodeToken';

import './login.styles.css';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (session) {
      console.log(session);
      console.log(username);
      const decodedToken = DecodeToken(session.token);
      setUsername(decodedToken.username);
      if (session.user.exists) {
        console.log(decodedToken.role);
        if (decodedToken.role === null) {
          router.push('/auth/pending');
        } else {
          router.push('/My/dashboard');
        }
      } else {
        setShowRegistration(true);
      }
    }
  }, [session, router]);

  return (
    <LoginRegistationLayout>
      <WelcomeBackComponent
        size={'h2'}
        back={false}
        content={
          showRegistration
            ? 'Just fill out the steps form below to complete your registration.'
            : 'Log in to your account'
        }
        username={showRegistration && username}
      />
      {!showRegistration && <LoginForm />}

      {showRegistration && (
        <div id="registration">
          <RegistrationForm userName={username} />
        </div>
      )}
    </LoginRegistationLayout>
  );
};

export default Login;
