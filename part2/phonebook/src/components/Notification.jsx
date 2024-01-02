import React from "react";

const Notification = ({ message }) => {
  const ShowStyle = {
    display: "block",
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
