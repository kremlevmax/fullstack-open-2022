import React from "react";

const LoginBadge = ({ user, logOut }) => {
  return (
    <div>
      <span>{user.name} is logged in</span>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default LoginBadge;
