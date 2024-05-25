import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export const ToggleDropdown = ({
  button,
  items,
  lastItemDivide,
  nbItemsAfterDivide,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContainerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
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

  const renderedButton =
    button && React.cloneElement(button, { onClick: toggleDropdown });
  const renderedItems =
    items && items.length > 0
      ? items.map((item, index) => {
          if (item.link) {
            return (
              <Link
                key={index}
                href={item.link}
                className="user-dropdown-item dropdown-item cursor-pointer"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            );
          } else if (item.onclick) {
            return (
              <div
                key={index}
                className="user-dropdown-item dropdown-item cursor-pointer"
                onClick={item.onclick}
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            );
          } else {
            return null;
          }
        })
      : null;

  return (
    <>
      {renderedButton}
      {isOpen && (
        <div
          className="user-dropdown-card dropdown-menu dropdown-menu-right right-0 mt-2 show d-flex flex-column gap-2"
          ref={dropdownContainerRef}
        >
          {lastItemDivide ? (
            <>
              {renderedItems.slice(0, -nbItemsAfterDivide)}
              <div className="dropdown-divider"></div>
              {renderedItems.slice(-nbItemsAfterDivide)}
            </>
          ) : (
            renderedItems
          )}
        </div>
      )}
    </>
  );
};
