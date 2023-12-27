import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherInfo from "./Weather";

const CountryInformation = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        const information = <WeatherInfo weather={response.data} />;
        setWeatherInfo(information);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherInfo(
          <p>Error fetching weather data for {country.capital}.</p>,
        );
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />

      <h2>Weather in {country.capital}</h2>
      {weatherInfo}
    </div>
  );
};

export default CountryInformation;
