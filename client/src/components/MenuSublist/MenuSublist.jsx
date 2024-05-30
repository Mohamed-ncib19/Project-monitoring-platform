import { useState } from 'react';
import Link from 'next/link';

import ArrowDownIcon from '@/../public/icons/arrows/arrow-down-icon';
import ArrowRightIcon from '@/../public/icons/arrows/arrow-right-icon';

export const MenuSublist = ({ Icon, text, isOpen, setIsOpen, list }) => {
  const [isOpenSublist, setIsOpenSublist] = useState(false);

  const handleOpenSublist = () => {
    if (!isOpen && !isOpenSublist) {
      setIsOpen(!isOpen);
    }
    setIsOpenSublist(!isOpenSublist);
  };
  return (
    <div className="sidebar-items px-1 py-1 w-100 rounded-3 ">
      <button
        onClick={handleOpenSublist}
        className={`d-flex text-center ${!isOpen ? 'justify-content-center' : 'justify-content-between'} p-2  bg-transparent w-100 border-0 align-items-center gap-2  `}
      >
        <div className="d-flex gap-2 justify-content-center align-items-center">
          {Icon}
          {isOpen ? (
            <span
              className={`h5 text-custom-color mt-2 ${isOpenSublist ? 'fw-bold' : ''} text-decoration-none`}
            >
              {text}
            </span>
          ) : null}
        </div>
        <>
          {isOpen ? (
            !isOpenSublist ? (
              <ArrowRightIcon />
            ) : (
              <ArrowDownIcon />
            )
          ) : null}
        </>
      </button>
      <ul
        className={` list d-flex flex-column gap-2 ${!isOpenSublist ? 'd-none' : ''}`}
      >
        {list.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.link}
              className=" item px-3 py-2 text-decoration-none rounded-2 p-2 text-black h6"
            >
              {item.content}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
