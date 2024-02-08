import PropTypes from "prop-types";

export const Header = ({ user }) => (
  <div className="flex flex-col">
    <h1 className="text-center font-bold text-5xl">Blogs</h1>
    {user !== null && (
      <p className="px-4 py-2">
        <span className="font-bold text-gray-900">{user.name}</span> logged in
      </p>
    )}
  </div>
);

Header.propTypes = {
  user: PropTypes.string.isRequired,
};
