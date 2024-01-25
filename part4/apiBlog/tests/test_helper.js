const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First Blog",
    author: "First Author",
    url: "First URL",
    likes: 1,
  },
  {
    title: "Second Blog",
    author: "Second Author",
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

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
