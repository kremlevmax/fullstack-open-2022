import React, { useState } from "react";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = visible === true ? "inline" : "none";
  const hideWhenVisible = visible === true ? "none" : "inline";

  return (
    <div style={{ display: "inline" }}>
      <div style={{ display: hideWhenVisible }}>
        {" "}
        <button onClick={() => setVisible(true)}>{props.buttonName}</button>
      </div>
      <div style={{ display: showWhenVisible }}>
        {props.children}
        <button onClick={() => setVisible(false)}>Hide</button>
      </div>
    </div>
  );
};

export default Toggable;
