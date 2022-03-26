import React from "react";
import coursesData from "./coursesData";
import Course from "./components/Course";
import Total from "./components/Total";

const App = () => {
  const allPartsArray = coursesData.reduce((partsArray, course) => {
    course.parts.forEach((part) => {
      partsArray.push(part);
    });
    return partsArray;
  }, []);

  const total = (partsArray) =>
    partsArray.reduce((totalSum, part) => {
      return totalSum + part.exercises;
    }, 0);

  return (
    <>
      {coursesData.map((coursesData) => (
        <Course
          key={coursesData.id}
          courseData={coursesData}
          total={total(coursesData.parts)}
        />
      ))}
      <Total total={total(allPartsArray)} />
    </>
  );
};

export default App;
