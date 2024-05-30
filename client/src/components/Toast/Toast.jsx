import clx from 'clsx';

import DangerCheck from '../../../public/icons/toast/danger-check-icon';
import SuccessIcon from '../../../public/icons/toast/success-check-icon';
import WarningIcon from '../../../public/icons/toast/warning-check-icon';

const Toast = ({ notification, dismissNotification }) => {
  let renderIcon;

  switch (notification.status) {
    case 'warning':
      renderIcon = <WarningIcon />;
      break;
    case 'danger':
      renderIcon = <DangerCheck />;
      break;
    case 'success':
    default:
      renderIcon = <SuccessIcon />;
  }

  return (
    <div className="custom-toast-container" onClick={dismissNotification}>
      <div
        className={clx('content', {
          'background-success-gradient': notification.status === 'success',
          'background-danger-gradient': notification.status === 'danger',
          'background-warning-gradient': notification.status === 'warning',
        })}
      >
        {renderIcon}
        <p className="message">{notification.message}</p>
      </div>
    </div>
  );
};

export default Toast;
