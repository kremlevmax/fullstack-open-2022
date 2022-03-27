import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);

  const hook = () =>
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response));

  useEffect(() => {
    hook();
  }, []);

  persons.length !== 0 ? console.log(persons) : console.log("Fetching Data");

  return <div className='App'></div>;
}

export default App;
