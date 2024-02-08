import PropTypes from "prop-types";
export const FormNewBlog = ({
  handleCreate,
  title,
  setTitle,
  author,
  url,
  setUrl,
}) => (
  <>
    <form
      onSubmit={handleCreate}
      className="max-w-xs mb-3 mx-auto bg-gray-50 p-8 rounded shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          name="Title"
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50 "
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Author
        </label>
        <input
          type="text"
          value={author}
          name="Author"
          disabled="disabled"
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50 "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Url
        </label>
        <input
          type="url"
          value={url}
          name="Author"
          onChange={({ target }) => setUrl(target.value)}
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-b-indigo-500 placeholder-gray-500 placeholder-opacity-50 "
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none active:bg-indigo-800"
      >
        Create
      </button>
    </form>
  </>
);

FormNewBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};
