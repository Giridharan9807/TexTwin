import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No Data Available', message = 'There are no items to display at this time.', icon: Icon = Inbox }) => {
  return (
    <div className="empty-state-box">
      <div className="empty-state-icon">
        <Icon size={32} />
      </div>
      <div className="empty-state-title">{title}</div>
      <div className="empty-state-sub">{message}</div>
    </div>
  );
};

export default EmptyState;
