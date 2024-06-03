import { useState } from 'react';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';


export const NotificationItem = ({ isread, name, type, background }) => {
  const [notificationType] = useState({
    'new user': `A warm welcome to our newest member <strong class="text-soft-black">${name}</strong>! Glad to have you with us.`,
    'top 3': `You've been ranked in the <strong class="text-soft-black"> Top 3</strong> for your exceptional contributions. Well done`,
    'top 1': `Congratulations! You've achieved the <strong class="text-soft-black"> top position </strong> for your exceptional contributions, Well done!        `,
    group: `You've been included in a group <strong class="text-soft-black"> group name</strong> . Let's work together to achieve our goals`,
    project: `Exciting news! You've been assigned to a new project <strong class="text-soft-black">project name </strong>card . Get ready for an adventure`,
  });

  return (
    <div
      className={`list-group-item  px-4 py-1 ${!isread ? 'bg-soft-tertiary-color' : ''} `}
    >
      <div className="d-flex justify-content-start align-items-center">
        <Avatar variant={background} name={name} rounded={'5'} />
        <div className="mx-2 mt-4">
          <p
            className="text-dark-gray"
            dangerouslySetInnerHTML={{ __html: notificationType[type] }}
          ></p>
          <p className="text-primary">10 minutes ago</p>
        </div>
      </div>
    </div>
  );
};