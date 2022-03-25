import React from "react";

import Header from "./Header";
import Content from "./Content";

const Course = ({ coursesData }) => {
  return (
    <>
      <Header header={coursesData.name} />
      <Content content={coursesData.parts} />
    </>
  );
};

export default Course;
