import PropTypes from "prop-types";
export const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <>
      <form
        onSubmit={handleLogin}
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
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
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
            type="password"
            value={password}
            name="Password"
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
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
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};
