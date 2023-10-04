import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate receiving notifications 
    const newNotification = {
      id: 1,
      message: 'You received a new review!',
      type: 'review',
    };

    // Display the new notification
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} ({notification.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
