import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };
    const personExists = persons.some(
      (person) => person.name === personObject.name,
    );
    if (!personExists) {
      setPersons(persons.concat(personObject));
    } else {
      alert(`${personObject.name} is already added to phonebook`);
    }
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {persons.map((person, index) => {
        return <p key={index}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
