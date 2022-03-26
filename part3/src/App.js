import React from "react";
import coursesData from "./coursesData";
import Course from "./components/Course";
import Total from "./components/Total";

const App = () => {
  const courses = coursesData.map((coursesData) => (
    <Course key={coursesData.id} coursesData={coursesData} />
  ));

  const allPartsArray = coursesData.reduce((partsArray, course) => {
    course.parts.forEach((part) => {
      partsArray.push(part);
    });
    return partsArray;
  }, []);

  const total = allPartsArray.reduce((totalSum, part) => {
    return totalSum + part.exercises;
  }, 0);

  return (
    <>
      {courses}
      <Total total={total} />
    </>
  );
};

export default App;
