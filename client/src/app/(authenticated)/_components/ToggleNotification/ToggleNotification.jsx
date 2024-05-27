import { useEffect, useRef, useState } from 'react';

import NotificationIcon from '@/../public/icons/notification-icons';
import { NotificationItem } from '@/app/(authenticated)/_components/NotificationItem';


export const ToggleNotification = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  
  const notificationsContainerRef = useRef(null);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const handleSeeMoreClick = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationsContainerRef.current &&
        !notificationsContainerRef.current.contains(event.target)
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

  const renderNotifications = showAllNotifications
    ? data
    : data.slice(0, 3);

  return (
    <div >
      <button
        className="rounded-circle p-2 border-0 shadow notification-button  "
        onClick={toggleNotification}
      >
        <NotificationIcon />
      </button>
      {isOpen && (
        <div
          className="notifications-dropdown z-index-999 col-lg-4 col-md-6 col-8 m-auto bg-light position-absolute card mt-1 "
          ref={notificationsContainerRef}
        >
          <div className=" card-header">
            Notifications - <span>{data.length}</span>
          </div>

          <div className=" list-group">
            {renderNotifications.map((not, index) => (
              <NotificationItem
                key={not.id}
                background={'light'}
                type={not.type}
                name={not.name}
              />
            ))}
          </div>

          <button className="w-100 border-0 p-3" onClick={handleSeeMoreClick}>
            {showAllNotifications ? 'Show less' : 'See more'}
          </button>
        </div>
      )}
    </div>
  );
};