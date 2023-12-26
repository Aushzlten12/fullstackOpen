import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [fieldSearch, setFieldSearch] = useState("");
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(fieldSearch),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter fieldSearch={fieldSearch} setFieldSearch={setFieldSearch} />
      <h2>Add a New</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Persons</h2>
      ...
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
