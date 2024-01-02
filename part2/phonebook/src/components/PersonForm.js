import React, { useState } from "react";

const PersonForm = ({ persons, setPersons, method }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
    };
    const personExists = persons.some(
      (person) => person.name === personObject.name,
    );
    if (!personExists) {
      method.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewPhone("");
      });
    } else {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one`,
        )
      ) {
        const id = persons.find(
          (person) => person.name === personObject.name,
        ).id;
        method.update(personObject, id).then((personUpdated) =>
          setPersons(
            persons.map((item) => {
              if (item.id === id) {
                return personUpdated;
              } else {
                return item;
              }
            }),
          ),
        );
        setNewName("");
        setNewPhone("");
      }
    }
  };
  return (
    <div>
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
    </div>
  );
};

export default PersonForm;
