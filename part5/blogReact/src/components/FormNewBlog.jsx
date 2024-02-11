import PropTypes from "prop-types";
import { useState } from "react";
export const FormNewBlog = ({ createBlog, author }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  const addNewBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <form
        onSubmit={addNewBlog}
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
            onChange={handleChangeTitle}
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
            onChange={handleChangeUrl}
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
};

FormNewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
};
