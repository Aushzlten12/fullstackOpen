import PropTypes from "prop-types";
import ImageLike from "./../images/like.svg";
import ImageRemove from "./../images/remove.png";
import { useState } from "react";
export const Blog = ({ blog, aumentLikes, remove, createdByUser }) => {
  const [visibility, setVisibility] = useState(true);

  const ContentButton = visibility ? "Show" : "Hide";
  const displayContent = { display: visibility ? "none" : "" };

  const ToggleVisibility = () => {
    setVisibility(!visibility);
  };

  const removeBlog = (event) => {
    event.preventDefault;
    if (window.confirm("Do you really want to remove this blog?")) {
      remove(blog.id);
    }
  };

  return (
    <>
      <li>
        <div className="border border-red-950 rounded px-5 py-3 my-5 mx-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="font-bold text-3xl text-blue-900">{blog.title}</h1>
            <button
              onClick={ToggleVisibility}
              className="px-3 py-1 rounded border font-bold bg-indigo-200 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
            >
              {ContentButton}
            </button>
          </div>
          <div style={displayContent}>
            <h2 className="">
              Created by{" "}
              <span className="font-bold ring-gray-600">{blog.author}</span>{" "}
            </h2>
            <a href={blog.url} className="underline text-blue-500">
              {blog.url}
            </a>
            <button
              onClick={aumentLikes}
              className="block mt-3 border rounded py-1 px-2 bg-gray-50"
            >
              <img className="inline w-5 h-5" src={ImageLike} alt="Like Blog" />
              <span className="ml-2">{blog.likes}</span>
            </button>
            {createdByUser && (
              <button className="mt-2" onClick={removeBlog}>
                <img className="w-7 h-7" src={ImageRemove} alt="remove" />
              </button>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

Blog.propTypes = {
  aumentLikes: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  createdByUser: PropTypes.bool.isRequired,
};
