import PropTypes from "prop-types";
import ErrorImage from "./../images/error.png";

export const ErrorMessage = ({ errorMessage }) => (
  <div className="max-w-80 mx-auto flex items-center justify-around mt-5 border rounded border-red-800 bg-red-100">
    <img className="w-5 h-5" src={ErrorImage} alt="error" />
    <p className="text-2xl font-bold text-gray-900">{errorMessage}</p>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
