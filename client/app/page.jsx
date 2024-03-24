'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Home = () => {

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.user.exists) {
      router.push('/auth/welcome');
    }
  }, [session, router]);

  if (!session || !session.user.exists) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <p>dashboard</p>
    </div>
  );
};

export default Home;