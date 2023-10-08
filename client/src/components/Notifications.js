import React, { useState, useEffect } from 'react';
import './Notifications.css';


function Notifications() {
  const [notifications, setNotifications] = useState([]);


  const handleRemoveNotification = (id) => {
   // Filter out the notification with the specified id
   const updatedNotifications = notifications.filter((notification) => notification.id !== id);
   setNotifications(updatedNotifications);
  };
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
    <div className="notifications-container">
      <h2 className="notifications-heading">Notifications</h2>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <div className="notification-message">
              {notification.message}
              <span className="notification-type">({notification.type})</span>
            </div>
            <button className="notification-close-button" onClick={() => handleRemoveNotification(notification.id)}>
              Close
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
