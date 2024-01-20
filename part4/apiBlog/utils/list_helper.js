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

module.exports = { dummy, totalLikes, favoriteBlog };
