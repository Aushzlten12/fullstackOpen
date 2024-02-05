const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "First Blog",
    url: "First URL",
    likes: 1,
  },
  {
    title: "Second Blog",
    url: "Second URL",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "None",
    author: "Me",
    url: "www.none.com",
    likes: 10,
  });

  await blog.save();
  await Blog.deleteOne({ title: "None" });

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  usersInDb,
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
