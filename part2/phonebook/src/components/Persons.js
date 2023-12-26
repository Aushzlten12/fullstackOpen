import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, index) => {
        return (
          <p key={index}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
