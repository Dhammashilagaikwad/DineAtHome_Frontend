// Notification.js
import React from 'react';
import '../styles/Notify.css'; 
import { useNotification } from './NotificationContext';

const Notify = () => {
  const { notification } = useNotification();
  return (
    notification.show && (
      <div className="notification" style={{ backgroundColor: notification.color }}>
        {notification.message}
      </div>
    )
  );
};

export default Notify;
