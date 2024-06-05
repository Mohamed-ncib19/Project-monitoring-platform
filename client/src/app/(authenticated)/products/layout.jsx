'use client';

import { BreadCumbProvider } from '@/app/(authenticated)/_context/BreadcrumbsContext';

const Layout = ({ children }) => {
    return (
        <BreadCumbProvider>
            {children}
        </BreadCumbProvider>
    );
}

export default Layout;
