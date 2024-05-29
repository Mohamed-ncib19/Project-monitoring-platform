import { getServerSession } from "next-auth";
import { Header } from "../(auth)/_components/Header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
    const user = await getServerSession(authOptions);
    console.log(user);
    
    if(!user) redirect('/');
    if(user.profile.role) redirect('/dashboard');

  return (
    <section>
        <Header />
        <div>
            {children}
        </div>
    </section>
  );
};

export default Layout;
