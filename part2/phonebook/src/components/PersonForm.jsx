import React, { useState } from "react";

const PersonForm = ({
  persons,
  setPersons,
  method,
  setterMessage,
  setterColor,
}) => {
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
      method
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setterColor("green");
          setterMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setterMessage(null);
          }, 5000);
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          setterColor("red");
          const messageIntro = "Person validation failed: ";
          var errorsMessages = [];
          if (error.response.data.error.errors.name !== undefined) {
            const messageErrorName = `name: Path 'name' (${personObject.name}) is shorter than minimum allowed length (3)`;
            errorsMessages.push(messageErrorName);
          }

          if (error.response.data.error.errors.number !== undefined) {
            const messageErrorNumber = `number: Path 'number' (${personObject.number}) is longer than maximum allowed length (8)`;
            errorsMessages.push(messageErrorNumber);
          }
          const messageError = messageIntro + errorsMessages.join(" ");
          setterMessage(messageError);
          setTimeout(() => {
            setterMessage(null);
          }, 5000);
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
        method
          .update(personObject, id)
          .then((personUpdated) => {
            setPersons(
              persons.map((item) => {
                if (item.id === id) {
                  return personUpdated;
                } else {
                  return item;
                }
              }),
            );
            setterColor("green");
            setterMessage(`Updated ${personObject.name}`);
            setTimeout(() => {
              setterMessage(null);
            }, 5000);
            setNewName("");
            setNewPhone("");
          })
          .catch(() => {
            setterColor("red");
            setterMessage(
              `Information of ${personObject.name} has already been removed from server`,
            );
            setPersons(
              persons.filter((item) => item.name !== personObject.name),
            );
            setTimeout(() => {
              setterMessage(null);
            }, 5000);
          });
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
