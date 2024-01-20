const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });
  const favoriteblog = blogs.shift();
  if (favoriteblog === undefined) {
    return {};
  } else {
    return {
      title: favoriteblog.title,
      author: favoriteblog.author,
      likes: favoriteblog.likes,
    };
  }
};

const mostBlogs = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author));
  const blogsPerAuthor = authors.map((author) => {
    const blogByAuthor = _.filter(blogs, (blog) => blog.author === author);
    return {
      author: author,
      blogs: blogByAuthor.length,
    };
  });
  blogsPerAuthor.sort(function (a, b) {
    return b.blogs - a.blogs;
  });
  if (blogsPerAuthor.length === 0) {
    return {};
  }
  return blogsPerAuthor[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
