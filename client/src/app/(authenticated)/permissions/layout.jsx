'use client'

import withAuth from "@/providers/BasedRole/withAuth";

const Layout = ({children})=>{

    return(
        <div>{children}</div>
    );

}

export default withAuth(Layout , 'permissions' , 'manage');
