import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [fieldSearch, setFieldSearch] = useState("");
  const hook = () => {
    personsService.getAll().then((InitialPersons) => {
      setPersons(InitialPersons);
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
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        method={personsService}
      />
      <h2>Persons</h2>
      ...
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
