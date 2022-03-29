import React from "react";

const Numbers = ({ personsToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ol>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Numbers;
