import PropTypes from "prop-types";
import ErrorImage from "./../images/error.png";
import DoneImage from "./../images/done.png";

export const Notification = ({ notification, color }) => {
  const BorderAndBackground =
    color === "red"
      ? "border-red-800 bg-red-100"
      : "border-green-800 bg-green-100";
  const styleMessage =
    color === "red"
      ? "text-2xl font-bold text-red-900"
      : "text-2xl font-bold text-green-900";
  const altImage = color === "red" ? "error" : "done";
  return (
    <div
      className={`max-w-max mx-auto flex px-4 items-center gap-5 justify-around mt-5 border rounded ${BorderAndBackground}`}
    >
      <img
        className="w-5 h-5"
        src={color === "red" ? ErrorImage : DoneImage}
        alt={altImage}
      />
      <p className={`${styleMessage} `}>{notification}</p>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
