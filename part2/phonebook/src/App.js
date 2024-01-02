import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [fieldSearch, setFieldSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
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
      <Notification message={successMessage} />
      <Filter fieldSearch={fieldSearch} setFieldSearch={setFieldSearch} />
      <h2>Add a New</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        method={personsService}
        setterMessage={setSuccessMessage}
        message={successMessage}
      />
      <h2>Persons</h2>
      ...
      <Persons
        persons={filteredPersons}
        setter={setPersons}
        method={personsService}
      />
    </div>
  );
};

export default App;
