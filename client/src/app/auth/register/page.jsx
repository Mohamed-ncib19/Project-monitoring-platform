'use client'
import { useEffect, useState } from "react";
import { DecodeToken } from "../../../utils/auth/DecodeToken";
import LoginRegistationLayout from "../../../layout/login-registartion/page";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const decodeToken = async (session) => {
      if (session) {
        const decoded = await DecodeToken(session.token);
       await setUserName(prevUserName => decoded.username);
      }
    };

    if (session) {
      decodeToken(session);
      console.log(userName)
      if (session.user.exists) {
        router.push("/");
      }
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <LoginRegistationLayout>
     
    </LoginRegistationLayout>
  );
};

export default Register;
