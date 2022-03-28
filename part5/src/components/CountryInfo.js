import React, { useEffect, useState } from "react";
import axios from "axios";

import WeatherReport from "./WeatherReport";

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState([]);

  const lat = country.capitalInfo.latlng[0];
  const long = country.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6f63f27b7090266cc92d734bd6aa50be&units=imperial`
      )
      .then((response) => setWeatherData(response.data));
  }, [country]);

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
      <WeatherReport weatherData={weatherData} />
    </div>
  );
};

export default CountryInfo;
