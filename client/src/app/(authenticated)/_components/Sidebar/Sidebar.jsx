'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clx from 'clsx';

import ArrowRightIcon from '@/../public/icons/arrows/arrow-right-icon';
import CalendarIcon from '@/../public/icons/sidebar-icons/calendar-icon';
import CompanyBalanceIcon from '@/../public/icons/sidebar-icons/compony-balance-icon';
import DashboardIcon from '@/../public/icons/sidebar-icons/dashboard-icon';
import PermissionIcon from '@/../public/icons/sidebar-icons/permission-Icon';
import ProductIcon from '@/../public/icons/sidebar-icons/product-icon';
import ProgramIcon from '@/../public/icons/sidebar-icons/program-icon';
import ProjectIcon from '@/../public/icons/sidebar-icons/project-icon';
import ScoreBoardIcon from '@/../public/icons/sidebar-icons/score-board-icon';
import ZentaoIcon from '@/../public/icons/sidebar-icons/zentao-icon';
import Logo from '@/../public/Logo/Logo.svg';
import LogoSvg from '@/../public/Logo/Logo-icon.svg';
import { useAuth } from '@/app/(authenticated)/_context/AuthContext';

export const Sidebar = () => {
  const { hasPermission } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSideBar = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="d-flex">
      <div
        className={clx('sidebar-container', {
          open: isOpen,
        })}
        ref={sidebarRef}
      >
        <div className="custom-sidebar d-flex flex-column justify-content-between align-items-center">
          <div className='w-100' >
            <div className="p-3">
              <Link href="/dashboard">
                <Image
                  src={isOpen ? Logo : LogoSvg}
                  width={isOpen ? 150 : 30}
                  alt="logo"
                  loading="lazy"
                  className="w-100"
                />
              </Link>
            </div>

            <div className="d-flex flex-column gap-1 mt-5 justify-content-center align-items-center m-auto p-2 border-bottom">
              <SidebarItem
                isOpen={isOpen}
                href="/dashboard"
                icon={<DashboardIcon />}
                label="Dashboard"
                onClick={handleItemClick}
              />
              {hasPermission('sidebar', 'Portfolio') && (
                <SidebarItem
                  isOpen={isOpen}
                  href="/portfolio"
                  icon={<ProgramIcon />}
                  label="Portfolio"
                  onClick={handleItemClick}
                />
              )}
              <SidebarItem
                isOpen={isOpen}
                href="/products"
                icon={<ProductIcon />}
                label="Product"
                onClick={handleItemClick}
              />
              <SidebarItem
                isOpen={isOpen}
                href="/projects"
                icon={<ProjectIcon />}
                label="Project"
                onClick={handleItemClick}
              />
              <SidebarItem
                isOpen={isOpen}
                href={process.env.NEXT_PUBLIC_ZENTTAO_URL}
                icon={<ZentaoIcon />}
                label="Zentao"
                target="_blank"
                onClick={handleItemClick}
              />
              <SidebarItem
                isOpen={isOpen}
                href="/dashboard"
                icon={<ScoreBoardIcon />}
                label="Score Board"
                onClick={handleItemClick}
              />
              <SidebarItem
                isOpen={isOpen}
                href="/dashboard"
                icon={<CalendarIcon />}
                label="Calendar"
                onClick={handleItemClick}
              />
              <SidebarItem
                isOpen={isOpen}
                href="/dashboard"
                icon={<CompanyBalanceIcon />}
                label="Company Balance"
                onClick={handleItemClick}
              />
              {hasPermission('sidebar', 'Permissions') && (
                <SidebarItem
                  isOpen={isOpen}
                  href="/permissions"
                  icon={<PermissionIcon />}
                  label="Permissions"
                  onClick={handleItemClick}
                />
              )}
            </div>
          </div>

          <div className="close-sidebar px-2 py-2 fs-5 mb-4 d-flex justify-content-center align-items-center">
            <button
              onClick={handleOpenSideBar}
              className="open-close-collapse bg-transparent border-0"
            >
              {isOpen ? (
                <>
                  <span className="light-text-custom-color">&lt;&lt;</span>
                  <span className="text-custom-color"> Collapse Sidebar</span>
                </>
              ) : (
                <span className="light-text-custom-color">&gt;&gt;</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ isOpen, href, icon, label, target = '_self', onClick }) => (
  <div className="sidebar-items px-1 py-1 w-100 rounded-3" onClick={onClick}>
    <Link
      href={href}
      target={target}
      className={`d-flex text-center justify-content-between ${!isOpen ? 'justify-content-center' : ''} align-items-center gap-2 p-2`}
    >
      {isOpen ? (
        <div className="d-flex align-items-center gap-2 justify-content-center">
          {icon}
          <span className="h5 text-custom-color mt-2 text-decoration-none">
            {label}
          </span>
        </div>
      ) : (
        icon
      )}
      {isOpen && <ArrowRightIcon />}
    </Link>
  </div>
);
