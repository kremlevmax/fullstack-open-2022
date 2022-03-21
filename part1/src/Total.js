import React from "react";

const Total = (props) => {
  const totalNumber = props.parts.reduce((sum, a) => sum + a.exercises, 0);

  return (
    <>
      <p>Number of exercises {totalNumber}</p>
    </>
  );
};

export default Total;
