import React from "react";

const Notification = ({ message, color }) => {
  const ShowStyle = {
    display: "block",
    color: color,
    borderColor: color,
  };
  if (message === null) {
    return null;
  } else {
    return (
      <div style={ShowStyle} className="success">
        {message}
      </div>
    );
  }
};

export default Notification;
