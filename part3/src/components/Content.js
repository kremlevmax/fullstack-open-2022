import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ content }) => {
  const parts = content.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  //reducer
  const total = content.reduce((partialSum, a) => partialSum + a.exercises, 0);

  return (
    <>
      {parts}
      <Total total={total} />
    </>
  );
};

export default Content;
