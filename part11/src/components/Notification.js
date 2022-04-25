import React from "react";

const Notification = ({ notification }) => {
  console.log(notification);
  return (
    <div style={{ color: notification[1] }}>
      <span>{notification[0]}</span>
    </div>
  );
};

export default Notification;
