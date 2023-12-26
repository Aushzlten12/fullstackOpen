import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setNewCountries] = useState([]);
  const [search, setNewSearch] = useState("");

  const countriesFinded = () => {
    const filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()),
    );
    const uniqCountry = filterCountries.filter(
      (country) => country.name.common.toLowerCase() === search.toLowerCase(),
    );
    if (filterCountries.length >= 10) {
      return (
        <div>
          <p>Too nany matches, specify another filter</p>
        </div>
      );
    } else if (filterCountries.length > 1) {
      if (uniqCountry.length > 0) {
        const country = uniqCountry.shift();
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
          </div>
        );
      } else {
        return (
          <div>
            {filterCountries.map((country, index) => {
              return <p key={index}>{country.name.common}</p>;
            })}
          </div>
        );
      }
    } else if (filterCountries.length === 1) {
      const country = filterCountries.shift();
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
        </div>
      );
    } else {
      return (
        <div>
          <p>Country not found</p>
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const Hook = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setNewCountries(response.data);
      });
  };

  useEffect(Hook, []);

  return (
    <div>
      <p>
        find countries <input value={search} onChange={handleSearchChange} />
      </p>
      {countriesFinded()}
    </div>
  );
};

export default App;
