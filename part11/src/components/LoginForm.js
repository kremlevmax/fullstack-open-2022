import React from "react";

const LoginForm = ({ props }) => {
  return (
    <form onSubmit={props.loginOnSubmitHandler}>
      <div>
        <span>Username:</span>
      </div>
      <div>
        <input
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
        ></input>
      </div>
      <div>
        <span>Password:</span>
      </div>
      <div>
        <input
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
        ></input>
      </div>
      <div>
        <button type='submit'>Enter</button>
      </div>
    </form>
  );
};

export default LoginForm;
