'use client'

import { BreadcrumbLink } from '@/app/(authenticated)/_components/Breadcrumb';
import { BreadCumbProvider } from '@/app/(authenticated)/_context/BreadcrumbsContext';
import withAuth from '@/providers/BasedRole/withAuth';

const Layout = async ({ children }) => {
  return (
      <BreadCumbProvider>
        <div className="px-5">
          <BreadcrumbLink />
        </div>
        {children}
      </BreadCumbProvider>
  );
};

export default withAuth(Layout, 'portfolio', 'manage');
