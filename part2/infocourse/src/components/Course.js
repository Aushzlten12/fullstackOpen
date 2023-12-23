import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
