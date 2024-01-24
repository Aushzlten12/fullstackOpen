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
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
  console.log("Closed connection");
});
