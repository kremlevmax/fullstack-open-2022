import React from "react";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <div>
        Languages:{" "}
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <p>
        <img src={country.flags.png} />
      </p>
    </div>
  );
};

export default CountryInfo;
