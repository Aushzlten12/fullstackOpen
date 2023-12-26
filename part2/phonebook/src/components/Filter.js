import React from "react";

const Filter = ({ fieldSearch, setFieldSearch }) => {
  const handleFieldSearch = (event) => {
    console.log(event.target.value);
    setFieldSearch(event.target.value);
  };
  return (
    <div>
      <p>
        filter shown with{" "}
        <input value={fieldSearch} onChange={handleFieldSearch} />
      </p>
    </div>
  );
};

export default Filter;
