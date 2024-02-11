const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const note = await Blog.findById(id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: user.username,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const blogSaved = await blog.save();
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();
  response.status(201).json(blogSaved);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const user = request.user;
    const blog = await Blog.findById(id);
    console.log(blog);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id);

      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "you are not authorized to delete this blog" });
    }
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const blog = {
    ...body,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
