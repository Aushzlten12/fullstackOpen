import PropTypes from "prop-types";
import ImageLike from "./../images/like.svg";
import { useState } from "react";
export const Blog = ({ title, author, url, likes, aumentLikes }) => {
  const [visibility, setVisibility] = useState(true);

  const ContentButton = visibility ? "Show" : "Hide";
  const displayContent = { display: visibility ? "none" : "" };

  const ToggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <li>
        <div className="border border-red-950 rounded px-5 py-3 my-5 mx-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="font-bold text-3xl text-blue-900">{title}</h1>
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
              <span className="font-bold ring-gray-600">{author}</span>{" "}
            </h2>
            <a href={url} className="underline text-blue-500">
              {url}
            </a>
            <button
              onClick={aumentLikes}
              className="block mt-3 border rounded py-1 px-2 bg-gray-50"
            >
              <img className="inline w-5 h-5" src={ImageLike} alt="Like Blog" />
              <span className="ml-2">{likes}</span>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  aumentLikes: PropTypes.func.isRequired,
};
