import PropTypes from "prop-types";

export const Header = ({ user, out }) => (
  <div className="flex flex-col">
    <h1 className="text-center font-bold text-5xl">Blogs</h1>
    {user !== null && (
      <div className="flex">
        <p className="px-4 py-2">
          <span className="font-bold text-gray-900">{user.name}</span> logged in
        </p>
        <button className="border rounded px-2" onClick={out}>
          logout
        </button>
      </div>
    )}
  </div>
);

Header.propTypes = {
  user: PropTypes.object,
  out: PropTypes.func.isRequired,
};
