import React from "react";

const Persons = ({ persons, setter, method }) => {
  const handleDeleteClick = (person) => {
    if (window.confirm("Do you want to delete this person?")) {
      method
        .remove(person.id)
        .then(() => setter(persons.filter((item) => item.id !== person.id)))
        .catch((error) => {
          window.alert(`ERROR: ${error}`);
        });
    }
  };
  return (
    <div>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <p>
              {person.name} {person.number}
              <button onClick={() => handleDeleteClick(person)}>delete</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
