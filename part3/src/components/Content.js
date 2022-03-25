import React from "react";
import Part from "./Part";

const Content = ({ content }) => {
  const parts = content.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  //reducer

  return <>{parts}</>;
};

export default Content;
