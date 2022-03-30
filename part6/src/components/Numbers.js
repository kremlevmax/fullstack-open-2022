import React from "react";

const Numbers = ({ personsToShow, onDeleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ol>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
            <button onClick={() => onDeleteHandler(person.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Numbers;
