'use client'

import 'semantic-ui-css/semantic.min.css';
import ToogleNotification from "./notification/toggle-notication";
import ToggleDropdown from '../dropdown/toggle-dropdown';
import Avatar from '../avatar/page';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {DecodeToken} from "../../utils/auth/DecodeToken";
import UserRoute from '../../app/api/routes/user/userRoute';
const Navbar = () => {
  const handlleSignOut = async () =>{
    await signOut();
  }

  const {data : session} = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async (session) => {
      const decoded = await DecodeToken(session?.token)
      const res = await UserRoute.getUserInfo(decoded.username, session?.token);

      if(res.ok){
        setUserData(res.data);
      }
      
    };

    if(session){
      fetchData(session);
    }
    console.log(userData)
  }, [session]);
  




  
  
    return ( 
    <div className="custom-bg-primary py-4 w-100 d-flex flex-md-row flex-column justify-content-between px-5 align-items-center " >
      <input type="text" placeholder="search" className="p-3 rounded-3 border-0" />

      <div className="d-flex justify-content-end align-items-center gap-4">
      <ToogleNotification />


      <ToggleDropdown button={
        <button className=' user-dropdown px-2 py-4 rounded-circle border-0'>
              <Avatar name={(userData && userData.firstname) + " " + (userData && userData.lastname)} rounded={'circle'} />
      </button>
      } 
      items={[
        {content : 'Profile' , link:'/My/profile'},
        {content : 'Settings' , onclick:'function'},
        {content : 'Log out' , onclick:handlleSignOut},
      ]}
      lastItemDivide={true}
      nbItemsAfterDivide={1}
      />



      </div>

    </div>

     );
}
 
export default Navbar;