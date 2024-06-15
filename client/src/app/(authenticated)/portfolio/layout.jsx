'use client';

import { BreadCumbProvider } from '@/app/(authenticated)/_context/BreadcrumbsContext';
import { BreadcrumbLink } from "@/app/(authenticated)/_components/Breadcrumb";
import { Suspense } from 'react';
import Loading from '@/app/loading';
import withAuth from '@/providers/BasedRole/withAuth';
const Layout = async ({ children }) => {
    
    return (
            <Suspense fallback={<Loading />}>
                <BreadCumbProvider>
                <div className="px-5">
                    <BreadcrumbLink  />
                </div>
            {children}
        </BreadCumbProvider>
            </Suspense>
    );
}

export default withAuth(Layout , 'portfolio', 'manage');
