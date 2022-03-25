import React from "react";
import coursesData from "./coursesData";
import Course from "./components/Course";
import Total from "./components/Total";

const App = () => {
  const courses = coursesData.map((coursesData) => (
    <Course key={coursesData.id} coursesData={coursesData} />
  ));

  const total = coursesData.reduce((totalSum, course) => {
    const exercises = course.parts.reduce((courseSum, partData) => {
      return courseSum.exercises + partData.exercises;
    });
    return totalSum + exercises;
  });
  console.log(total);

  return (
    <>
      {courses}
      {/* <Total total={total} /> */}
    </>
  );
};

export default App;
