import React from "react";
import { useState, useEffect } from "react";

import Search from "./components/Search";
import AddNewRecord from "./components/AddNewRecord";
import Numbers from "./components/Numbers";
import numbersService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [entry, setEntry] = useState({ name: "", phoneNumber: "", id: "" });
  const [filterString, setFilterString] = useState("");

  const person = { name: entry.name, phoneNumber: entry.phoneNumber };

  useEffect(() => {
    numbersService.getAll().then((response) => setPersons(response));
  }, [persons.length]);

  const onChangeNameHandler = (event) => {
    setEntry({ ...entry, name: event.target.value });
  };

  const onChangePhoneNumberHandler = (event) => {
    setEntry({ ...entry, phoneNumber: event.target.value });
  };

  const onChangeFilterHandler = (event) => {
    setFilterString(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === entry.phoneNumber)) {
      alert(`${entry.phoneNumber} is already in list`);
    } else {
      numbersService.createEntry(person).then((response) => {
        setPersons(persons.concat(response));
      });
    }
    setEntry({ name: "", phoneNumber: "", id: "" });
  };

  const onDeleteHandler = (id) => {
    numbersService.deleteEntry(id);
    const personsArray = persons;
    setPersons(personsArray.filter((item) => item.id !== id));
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
        onChangePhoneNumberHandler={onChangePhoneNumberHandler}
        person={person}
      />
      <Numbers
        personsToShow={personsToShow}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
