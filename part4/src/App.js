import React from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onChangeHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const contacts = persons.map((person) => (
    <li key={person.name}>{person.name}</li>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onChangeHandler} value={newName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ol>{contacts}</ol>
    </div>
  );
};

export default App;
