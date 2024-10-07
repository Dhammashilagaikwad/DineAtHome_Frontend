// NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    color: '',
    show: false,
  });

  const triggerNotification = (message, color) => {
    setNotification({ message, color, show: true });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000); // Show for 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notification, triggerNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
