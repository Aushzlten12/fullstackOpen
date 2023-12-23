import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((s, p) => {
    // console.log("what is happening", s, p);
    return s + p.exercises;
  }, 0);
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <p>Total of {totalExercises} exercises</p>
    </div>
  );
};

export default Content;
