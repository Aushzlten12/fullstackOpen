import { useState } from "react";
import PropTypes from "prop-types";

export const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhehnVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hiddenWhehnVisible}>
        <button
          onClick={toggleVisibility}
          className="px-3 py-2 border rounded max-w-fit ml-3 bg-lime-200 font-bold"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}
          className="px-3 py-2 border rounded max-w-fit ml-3 bg-red-200 font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
