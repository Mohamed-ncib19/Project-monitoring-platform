'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ArrowIcons from '@/../public/icons/arrows/arrow-icon';
import SibebarIcons from '@/../public/icons/sidebar-icons/sidebar-icons';
import Logo from '@/../public/images/Logo.svg';
import LogoSvg from '@/../public/images/Logo-icon.svg';

export const Sidebar = () => {
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
    <div className={`${isOpen ? 'sidebar-backdrop' : ''} position-fixed z-index-999`} >
    <div
      className={`backdrop-background  position-fixed`}
      ref={sidebarRef}
    >
      <div
        className={`custom-sidebar-background border-end-5 border shadow float-start d-flex flex-column justify-content-between   align-items-center min-vh-100 ${
          isOpen
            ? 'col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-4 col-7 w-100 '
            : ''
        }  `}
      >
        <div className="w-100   ">
          <div className="p-3  w-100">
            <Suspense fallback={<p>laoding</p>}>
              <Link href="/dashboard">
                <Image
                  src={isOpen ? Logo : LogoSvg}
                  width={isOpen ? 100 : 30}
                  alt="logo"
                  
                  loading="lazy"
                  className="w-100"
                />
              </Link>
            </Suspense>
          </div>

          <div className=" d-flex flex-column gap-1 mt-5 justify-content-center align-items-center m-auto p-2  border-bottom ">
            <div className="sidebar-items px-1 py-1 w-100 rounded-3">
              <Link
                href="/dashboard"
                className={`d-flex text-center justify-content-between ${
                  !isOpen ? 'justify-content-center' : ''
                } align-items-center gap-2 p-2`}
              >
                {isOpen ? (
                  <div className="d-flex align-items-center gap-2 justify-content-center">
                    <SibebarIcons.DashboardIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Dashboard
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.DashboardIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
              </Link>
            </div>

            {userRole === 'manager' && (
              <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                <Link
                  href="/programs"
                  className={`d-flex text-center justify-content-between ${
                    !isOpen ? 'justify-content-center' : ''
                  } align-items-center gap-2 p-2`}
                >
                  {isOpen ? (
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <SibebarIcons.ProgramIcon />
                      <span className="h5 text-custom-color mt-2 text-decoration-none">
                        Program
                      </span>
                    </div>
                  ) : (
                    <SibebarIcons.ProgramIcon />
                  )}
                  {isOpen && <ArrowIcons.ArrowRightIcon />}
                </Link>
              </div>
            )}

            {userRole !== 'developper' && (
              <div className="sidebar-items px-1 py-1 w-100 rounded-3">
                <Link
                  href="/products"
                  className={`d-flex text-center justify-content-between ${
                    !isOpen ? 'justify-content-center' : ''
                  } align-items-center gap-2 p-2`}
                >
                  {isOpen ? (
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <SibebarIcons.ProductIcon />
                      <span className="h5 text-custom-color mt-2 text-decoration-none">
                        Product
                      </span>
                    </div>
                  ) : (
                    <SibebarIcons.ProductIcon />
                  )}
                  {isOpen && <ArrowIcons.ArrowRightIcon />}
                </Link>
              </div>
            )}

            <div className="sidebar-items px-1 py-1 w-100 rounded-3">
              <Link
                href="/projects"
                className={`d-flex text-center justify-content-between ${
                  !isOpen ? 'justify-content-center' : ''
                } align-items-center gap-2 p-2`}
              >
                {isOpen ? (
                  <div className="d-flex align-items-center gap-2 justify-content-center">
                    <SibebarIcons.ProojectIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Project
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.ProojectIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
              </Link>
            </div>

            <div className="sidebar-items px-1 py-1 w-100 rounded-3">
              <Link
                href="http://localhost/zentao"
                className={`d-flex text-center justify-content-between ${
                  !isOpen ? 'justify-content-center' : ''
                } align-items-center gap-2 p-2`}
              >
                {isOpen ? (
                  <div className="d-flex align-items-center gap-2 justify-content-center">
                    <SibebarIcons.ZentaoIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Zentao
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.ZentaoIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
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
                    <SibebarIcons.ScoreBoardIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Score Board
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.ScoreBoardIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
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
                    <SibebarIcons.CalendarIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Calendar
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.CalendarIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
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
                    <SibebarIcons.CompanyBalanceIcon />
                    <span className="h5 text-custom-color mt-2 text-decoration-none">
                      Company Balance
                    </span>
                  </div>
                ) : (
                  <SibebarIcons.CompanyBalanceIcon />
                )}
                {isOpen && <ArrowIcons.ArrowRightIcon />}
              </Link>
            </div>
          </div>

          <div className="sidebar-items px-1 py-1 w-100 rounded-3">
            <Link
              href="/permissions"
              className={`d-flex text-center justify-content-between ${
                !isOpen ? 'justify-content-center' : ''
              } align-items-center gap-2 p-2`}
            >
              {isOpen ? (
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <SibebarIcons.PermissionIcon />
                  <span className="h5 text-custom-color mt-2 text-decoration-none">
                    Permissions
                  </span>
                </div>
              ) : (
                <SibebarIcons.PermissionIcon />
              )}
              {isOpen && <ArrowIcons.ArrowRightIcon />}
            </Link>
          </div>
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