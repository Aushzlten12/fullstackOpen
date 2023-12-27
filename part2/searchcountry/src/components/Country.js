import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryInformation = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [country.capital]); // Dependencia para re-ejecutar el efecto si la capital cambia

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

export default CountryInformation;
