import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content courseID={course.id} parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
