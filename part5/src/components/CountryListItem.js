import React from "react";

const CountryListItem = ({ country, showInfoHandler }) => {
  return (
    <li>
      {country.name.common}{" "}
      <button onClick={() => showInfoHandler(country)}>Show Info</button>
    </li>
  );
};

export default CountryListItem;
