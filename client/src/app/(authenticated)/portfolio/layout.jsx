'use client'
import { BreadcrumbLink } from "@/app/(authenticated)/_components/Breadcrumb";

const Layout = async ({children})=>{
    return(
        <>
        <div className="px-3" >
        <BreadcrumbLink />
        </div>
        {children}
        </>
    );
}

export default Layout;