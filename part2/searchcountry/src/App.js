import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryInformation from "./components/Country";
import CountriesFound from "./components/Countries";
import { MoreCountries, NotFoundContries } from "./components/MoreOrNot";
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
      return <MoreCountries />;
    } else if (filterCountries.length > 1) {
      if (uniqCountry.length > 0) {
        const country = uniqCountry.shift();
        return <CountryInformation country={country} />;
      } else {
        return <CountriesFound countries={filterCountries} />;
      }
    } else if (filterCountries.length === 1) {
      const country = filterCountries.shift();
      return <CountryInformation country={country} />;
    } else {
      return <NotFoundContries />;
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
