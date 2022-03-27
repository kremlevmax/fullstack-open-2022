import React from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  const onChangeNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const onChangePhoneNumberHandler = (event) => {
    event.preventDefault();
    setNewPhoneNumber(event.target.value);
  };

  const onChangeFilterHandler = (event) => {
    event.preventDefault();
    setFilterString(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in list`);
    } else {
      setPersons(
        persons.concat({ name: newName, phoneNumber: newPhoneNumber })
      );
    }
    setNewName("");
    setNewPhoneNumber("");
  };

  const personsToShow =
    filterString === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterString.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={onChangeFilterHandler} />
        </div>
      </form>
      <h2>Add a new record</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onChangeNameHandler} value={newName} />
        </div>
        <div>
          number:{" "}
          <input onChange={onChangePhoneNumberHandler} value={newPhoneNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ol>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
