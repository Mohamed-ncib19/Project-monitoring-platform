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

  const [userRole, setUserRole] = useState('');

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
  return (
    <>
      <div className='' >
        <div ref={sidebarRef} className="position-sticky">
          <div className="custom-sidebar border-end-5 border shadow float-start d-flex flex-column justify-content-between align-items-center">
            <div>
              <div className="p-3">
                  <Link href="/dashboard">
                    <Image
                      src={isOpen ? Logo : LogoSvg}
                      width={isOpen ? 100 : 30}
                      alt="logo"
                      loading="lazy"
                      className="w-100"
                    />
                  </Link>
              </div>

              <div className=" d-flex flex-column gap-1 mt-5 justify-content-center align-items-center m-auto p-2  border-bottom ">
                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href="/dashboard"
                    className={clx(
                      'd-flex text-center justify-content-between align-items-center gap-2 p-2',
                      {
                        'justify-content-center': !isOpen,
                      },
                    )}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <DashboardIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Dashboard
                        </span>
                      </div>
                    ) : (
                      <DashboardIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>

                { hasPermission('sidebar' , 'Portfolio') &&
                    <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                    <Link
                      href="/portfolio"
                      className={`d-flex text-center justify-content-between ${
                        !isOpen ? 'justify-content-center' : ''
                      } align-items-center gap-2 p-2`}
                    >
                      {isOpen ? (
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <ProgramIcon />
                          <span className="h5 text-custom-color mt-2 text-decoration-none">
                            Portfolio
                          </span>
                        </div>
                      ) : (
                        <ProgramIcon />
                      )}
                      {isOpen && <ArrowRightIcon />}
                    </Link>
                  </div>}

                
                  <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                    <Link
                      href="/products"
                      className={`d-flex text-center justify-content-between ${
                        !isOpen ? 'justify-content-center' : ''
                      } align-items-center gap-2 p-2`}
                    >
                      {isOpen ? (
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <ProductIcon />
                          <span className="h5 text-custom-color mt-2 text-decoration-none">
                            Product
                          </span>
                        </div>
                      ) : (
                        <ProductIcon />
                      )}
                      {isOpen && <ArrowRightIcon />}
                    </Link>
                  </div>
                

                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href="/projects"
                    className={`d-flex text-center justify-content-between ${
                      !isOpen ? 'justify-content-center' : ''
                    } align-items-center gap-2 p-2`}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <ProjectIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Project
                        </span>
                      </div>
                    ) : (
                      <ProjectIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>

                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href={process.env.NEXT_PUBLIC_ZENTTAO_URL}
                    target='_blank'
                    className={`d-flex text-center justify-content-between ${
                      !isOpen ? 'justify-content-center' : ''
                    } align-items-center gap-2 p-2`}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <ZentaoIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Zentao
                        </span>
                      </div>
                    ) : (
                      <ZentaoIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>

                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href="/dashboard"
                    className={`d-flex text-center justify-content-between ${
                      !isOpen ? 'justify-content-center' : ''
                    } align-items-center gap-2 p-2`}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <ScoreBoardIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Score Board
                        </span>
                      </div>
                    ) : (
                      <ScoreBoardIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>

                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href="/dashboard"
                    className={`d-flex text-center justify-content-between ${
                      !isOpen ? 'justify-content-center' : ''
                    } align-items-center gap-2 p-2`}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <CalendarIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Calendar
                        </span>
                      </div>
                    ) : (
                      <CalendarIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>

                <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                  <Link
                    href="/dashboard"
                    className={`d-flex text-center justify-content-between ${
                      !isOpen ? 'justify-content-center' : ''
                    } align-items-center gap-2 p-2`}
                  >
                    {isOpen ? (
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <CompanyBalanceIcon />
                        <span className="h5 text-custom-color mt-2 text-decoration-none">
                          Company Balance
                        </span>
                      </div>
                    ) : (
                      <CompanyBalanceIcon />
                    )}
                    {isOpen && <ArrowRightIcon />}
                  </Link>
                </div>
              </div>

              { hasPermission('sidebar' , 'Permissions') &&
               <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                <Link
                  href="/permissions"
                  className={` d-flex text-center justify-content-between ${
                    !isOpen ? 'justify-content-center' : ''
                  } align-items-center gap-2 p-2`}
                >
                  {isOpen ? (
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <PermissionwIcon />
                      <span className="h5 text-custom-color mt-2 text-decoration-none">
                        Permissions
                      </span>
                    </div>
                  ) : (
                    <PermissionIcon />
                  )}
                  {isOpen && <ArrowRightIcon />}
                </Link>
              </div>
                    }


            </div>

            <div className=" close-sidebar px-2 py-2 fs-5 mb-4 d-flex justify-content-center align-items-center">
              <button
                onClick={handleOpenSideBar}
                className=" open-close-collapse bg-transparent border-0"
              >
                {isOpen ? (
                  <>
                    <span className="light-text-custom-color"> &lt;&lt;</span>
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
    </>
  );
};