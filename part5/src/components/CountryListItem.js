import React from "react";

const CountryListItem = ({ country }) => {
  return <li>{country.name.common}</li>;
};

export default CountryListItem;
