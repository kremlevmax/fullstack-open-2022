import React from "react";
import { useState } from "react";

import Search from "./components/Search";
import AddNewRecord from "./components/AddNewRecord";
import Numbers from "./components/Numbers";

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
      <Search onChangeFilterHandler={onChangeFilterHandler} />
      <AddNewRecord
        onSubmitHandler={onSubmitHandler}
        onChangeNameHandler={onChangeNameHandler}
        newName={newName}
        onChangePhoneNumberHandler={onChangePhoneNumberHandler}
        newPhoneNumber={newPhoneNumber}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
