import React from "react";
const Notification = (notification) => {
  const showMessage = (message, color) => {
    setTimeout(() => {
      <div style={{ color }}>
        <span>{message}</span>
      </div>;
    }, 3000);
  };
  return (
    <>{notification && showMessage(notification.message, notification.color)}</>
  );
};

export default Notification;
