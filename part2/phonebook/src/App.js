import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [fieldSearch, setFieldSearch] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(fieldSearch),
  );
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleFieldSearch = (event) => {
    console.log(event.target.value);
    setFieldSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhone,
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
    setNewPhone("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with:{" "}
        <input value={fieldSearch} onChange={handleFieldSearch} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Persons</h2>
      ...
      <div>
        {filteredPersons.map((person, index) => {
          return (
            <p key={index}>
              {person.name} {person.phone}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default App;
