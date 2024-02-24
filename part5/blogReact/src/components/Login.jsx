import PropTypes from "prop-types";
import { useState } from "react";
export const Login = ({ HandleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const LogInUser = (event) => {
    event.preventDefault();
    HandleLogin({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };
  return (
    <>
      <form
        onSubmit={LogInUser}
        className="max-w-xs mt-8 mx-auto bg-gray-100 p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            name="Username"
            onChange={handleChangeUsername}
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            name="Password"
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50"
            onChange={handleChangePassword}
            placeholder="Enter your password"
          />
        </div>
        <button
          id="submitButton"
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none active:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  HandleLogin: PropTypes.func.isRequired,
};
