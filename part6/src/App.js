import React from "react";
import { useState, useEffect } from "react";

import Search from "./components/Search";
import AddNewRecord from "./components/AddNewRecord";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";

import numbersService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [entry, setEntry] = useState({ name: "", phoneNumber: "", id: "" });
  const [filterString, setFilterString] = useState("");
  const [notification, setNotification] = useState(null);

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

    if (persons.some((person) => person.name === entry.name)) {
      const duplicateIndex = persons.find(
        (person) => person.name === entry.name
      ).id;

      numbersService
        .updateEntry(duplicateIndex, entry)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== duplicateIndex ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          setNotification({
            message: `Sorry, ${entry.name} didn't exist on server!`,
            color: "red",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== duplicateIndex));
        });
    } else {
      numbersService.createEntry(entry).then((response) => {
        setPersons(persons.concat(response));
      });

      //Notification appear and dissappear
      setNotification({
        message: `${entry.name} was added to the list`,
        color: "green",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
      <Notification notification={notification} />
      <AddNewRecord
        onSubmitHandler={onSubmitHandler}
        onChangeNameHandler={onChangeNameHandler}
        onChangePhoneNumberHandler={onChangePhoneNumberHandler}
        person={entry}
      />
      <Numbers
        personsToShow={personsToShow}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
