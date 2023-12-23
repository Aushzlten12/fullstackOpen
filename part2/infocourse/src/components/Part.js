import React from "react";

const Part = ({ part }) => {
  return (
    <div>
      <h2>Part: {part.name}</h2>
      <p>Exercises: {part.exercises}</p>
    </div>
  );
};

export default Part;
