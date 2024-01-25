const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("./../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

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
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
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
});

describe("deletion of a blog", () => {
  test("deleting a blog succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test("deleting a blog fails with status code 400 if id is invalid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const invalidId = "5a3d5da59070081a82a3445";
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(blogsAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
  console.log("Closed connection");
});
