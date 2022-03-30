import React from "react";
import "./Notification.css";

const Notification = ({ notificationMessage }) => {
  if (!notificationMessage) {
    return null;
  } else {
    return (
      <div className='notification-block'>
        <span className='notification-block__text'>{notificationMessage}</span>
      </div>
    );
  }
};

export default Notification;
