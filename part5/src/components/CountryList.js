import React from "react";

import CountryListItem from "./CountryListItem";
import CountryInfo from "./CountryInfo";

const CountryList = ({ listToShow }) => {
  const countryListItems =
    listToShow.length === 1 ? (
      <CountryInfo country={listToShow[0]} />
    ) : (
      listToShow.map((country) => (
        <CountryListItem key={country.name.common} country={country} />
      ))
    );

  return <ol>{countryListItems}</ol>;
};

export default CountryList;
