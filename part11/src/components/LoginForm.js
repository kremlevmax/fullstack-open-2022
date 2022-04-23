import React from "react";

const LoginForm = ({ props }) => {
  console.log(props);
  return (
    <div>
      <div>
        <span>Username:</span>
      </div>
      <div>
        <input
          value={props.username}
          onChange={props.usernameOnChangeHandler}
        ></input>
      </div>
      <div>
        <span>Password:</span>
      </div>
      <div>
        <input
          value={props.password}
          onChange={props.passwordOnChangeHandler}
        ></input>
      </div>
      <div>
        <button onClick={props.enterOnClickHandler}>Enter</button>
      </div>
    </div>
  );
};

export default LoginForm;
