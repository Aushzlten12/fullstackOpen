import React from "react";

const WeatherInfo = ({ weather }) => {
  return (
    <div>
      <p>
        {" "}
        <strong>temperature: </strong> {weather.main.temp}
      </p>
      <p>
        {" "}
        <strong>description: </strong> {weather.weather[0].description}
      </p>
      <p>
        <strong>wind: </strong>
        {weather.wind.speed} mps direction {weather.wind.deg} degrees
      </p>
    </div>
  );
};

export default WeatherInfo;
