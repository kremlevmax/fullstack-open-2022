import React from "react";
import { useState, useEffect } from "react";

import Search from "./components/Search";
import AddNewRecord from "./components/AddNewRecord";
import Numbers from "./components/Numbers";
import numbersService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  const person = { name: newName, phoneNumber: newPhoneNumber };

  useEffect(() => {
    numbersService.getAll().then((response) => setPersons(response));
  }, [persons]);

  const onChangeNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const onChangePhoneNumberHandler = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const onChangeFilterHandler = (event) => {
    setFilterString(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in list`);
    } else {
      numbersService
        .createEntry(person)
        .then((response) => setPersons(persons.concat(response)));
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
      <Search onChangeFilterHandler={onChangeFilterHandler} />
      <AddNewRecord
        onSubmitHandler={onSubmitHandler}
        onChangeNameHandler={onChangeNameHandler}
        newPhoneNumber={newPhoneNumber}
        onChangePhoneNumberHandler={onChangePhoneNumberHandler}
        person={person}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
