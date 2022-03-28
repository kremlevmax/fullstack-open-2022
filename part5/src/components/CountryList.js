import React from "react";

import CountryListItem from "./CountryListItem";
import CountryInfo from "./CountryInfo";

const CountryList = ({ listToShow, showInfoHandler }) => {
  const countryListItems =
    listToShow.length === 1 ? (
      <CountryInfo country={listToShow[0]} />
    ) : (
      listToShow.map((country) => (
        <CountryListItem
          key={country.name.common}
          country={country}
          showInfoHandler={showInfoHandler}
        />
      ))
    );

  return <ol>{countryListItems}</ol>;
};

export default CountryList;
