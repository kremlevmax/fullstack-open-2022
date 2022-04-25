import React, { useState } from "react";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = visible === true ? "block" : "none";
  const hideWhenVisible = visible === true ? "none" : "block";

  return (
    <div>
      <div style={{ display: hideWhenVisible }}>
        <button onClick={() => setVisible(true)}>Show Form</button>
      </div>
      <div style={{ display: showWhenVisible }}>
        {props.children}
        <button onClick={() => setVisible(false)}>Hide Form</button>
      </div>
    </div>
  );
};

export default Toggable;
