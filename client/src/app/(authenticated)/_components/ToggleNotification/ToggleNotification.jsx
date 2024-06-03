import { useEffect, useRef, useState } from 'react';
import NotificationIcon from '@/../public/icons/notification-icons';
import { NotificationItem } from '@/app/(authenticated)/_components/NotificationItem';
import { Dropdown } from 'react-bootstrap';

export const ToggleNotification = ({ data }) => {
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  


  const handleSeeMoreClick = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  const renderNotifications = showAllNotifications ? data : data.slice(0, 3);

  return (
    <Dropdown  >
      <Dropdown.Toggle as="button" className="btn btn-light rounded-circle py-3 px-3">
        <NotificationIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu className="notifications-container">
        <div className="card-header">
          Notifications - <span>{data.length}</span>
        </div>

        <div className="list-group">
          {renderNotifications.map((not) => (
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
      </Dropdown.Menu>
    </Dropdown>
  );
};
