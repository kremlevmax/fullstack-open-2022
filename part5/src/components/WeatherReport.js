import React from "react";

const WeatherReport = ({ weatherData }) => {
  if (typeof weatherData.weather !== "undefined") {
    console.log(weatherData.weather[0]);
    return (
      <div>
        <h2>Weather in {weatherData.name}</h2>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
        </div>
        <div>
          <b>Temperature: {weatherData.main.temp}°K</b>
        </div>
        <div>Wind Speed: {weatherData.wind.speed} m/s</div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WeatherReport;
