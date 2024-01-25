const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("./../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  console.log("blogs saved");
  await Promise.all(promiseArray);
  console.log("done");
});

test("blogs are returned as json", async () => {
  console.log("Entered test");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  console.log(response);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
});

test("a valid blog can be added", async () => {
  const blog = {
    title: "New Blog",
    author: "New Author",
    url: "www.newurl.com",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const blogsContent = blogsAtEnd.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    };
  });
  expect(blogsContent).toContainEqual(blog);
});

test("blog without likes property defaults to 0", async () => {
  const blog = {
    title: "New Blog",
    author: "New Author",
    url: "www.newurl.com",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const blogsContent = blogsAtEnd.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    };
  });
  expect(blogsContent).toContainEqual({
    title: "New Blog",
    author: "New Author",
    url: "www.newurl.com",
    likes: 0,
  });
});

test("if title and url are missing, 400 is returned", async () => {
  const blog = {
    author: "New Author",
    likes: 10,
  };

  await api.post("/api/blogs").send(blog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
  console.log("Closed connection");
});
