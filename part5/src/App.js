import React, { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import CountryList from "./components/CountryList";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [listToShow, setListToShow] = useState([]);

  const hook = () =>
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountriesList(response.data));

  useEffect(() => {
    hook();
  }, []);

  const onChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.value.length > 0) {
      setListToShow(
        countriesList.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setListToShow([]);
    }
  };

  const showInfoHandler = (data) => {
    setListToShow([data]);
  };

  console.log(listToShow);

  // countriesList.length !== 0
  //   ? console.log(countriesList)
  //   : console.log("Fetching Data");

  return (
    <div className='App'>
      <Search onChangeHandler={onChangeHandler} />
      <CountryList listToShow={listToShow} showInfoHandler={showInfoHandler} />
    </div>
  );
}

export default App;
