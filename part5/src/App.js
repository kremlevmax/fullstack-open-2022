import React, { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import CountryList from "./components/CountryList";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [searchRequest, setSearchRequest] = useState("%");

  const hook = () =>
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountriesList(response.data));

  useEffect(() => {
    hook();
  }, []);

  const onChangeHandler = (event) => {
    event.preventDefault();
    setSearchRequest(event.target.value || "$");
  };

  const listToShow = countriesList.filter((country) =>
    country.name.common.toLowerCase().includes(searchRequest.toLowerCase())
  );

  // console.log(listToShow);

  // countriesList.length !== 0
  //   ? console.log(countriesList)
  //   : console.log("Fetching Data");

  return (
    <div className='App'>
      <Search onChangeHandler={onChangeHandler} />
      <CountryList listToShow={listToShow} />
    </div>
  );
}

export default App;
