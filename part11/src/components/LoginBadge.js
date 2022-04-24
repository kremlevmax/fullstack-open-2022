import React from "react";

const LoginBadge = ({ user }) => {
  return (
    <div>
      <span>{user.name} is logged in</span>
    </div>
  );
};

export default LoginBadge;
