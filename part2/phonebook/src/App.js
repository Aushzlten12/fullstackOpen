import "./App.css";
import React, { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [fieldSearch, setFieldSearch] = useState("");
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