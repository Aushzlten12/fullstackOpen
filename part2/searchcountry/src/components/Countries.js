import React, { useState } from "react";
import CountryInformation from "./Country";

const CountriesFound = ({ countries }) => {
  const [info, setInfo] = useState("");

  const showInfo = (country) => {
    const content = <CountryInformation country={country} />;
    setInfo(content);
  };

  return (
    <div>
      {countries.map((country, index) => {
        return (
          <div key={index}>
            {country.name.common}{" "}
            <button onClick={() => showInfo(country)}>show</button>
          </div>
        );
      })}
      {info}
    </div>
  );
};

export default CountriesFound;
