import React from "react";
import "./Notification.css";

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  } else {
    console.log(notification.color);
    return (
      <div className={`notification-block ${notification.color}`}>
        <span className='notification-block__text'>{notification.message}</span>
      </div>
    );
  }
};

export default Notification;
