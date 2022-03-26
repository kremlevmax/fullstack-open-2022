import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

// Separate Component
const Course = ({ courseData, total }) => {
  return (
    <>
      <Header header={courseData.name} />
      <Content content={courseData.parts} />
      <Total total={total} />
    </>
  );
};

export default Course;
