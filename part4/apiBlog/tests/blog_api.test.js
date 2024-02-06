const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("./../models/blog");
const User = require("./../models/user");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "aushalten", passwordHash });
  await user.save();
  const blogObjects = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        url: blog.title,
        likes: blog.likes,
        author: user.username,
        user: user.id,
      }),
  );
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
}, 10000);

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    const result = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    console.log(result);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    // console.log(response);
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
  test("a valid blog can be added with valid token", async () => {
    const user = {
      username: "aushalten",
      password: "sekret",
    };

    const resultWithToken = await api.post("/api/login").send(user);
    const token = resultWithToken.body.token;

    const blog = {
      title: "New Blog",
      url: "www.newurl.com",
      likes: 10,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const blogCreated = await api
      .post("/api/blogs")
      .set(headers)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const userFound = await User.findOne({ username: user.username });
    const blogExists = blogsAtEnd.some((b) => {
      return (
        b.title === blogCreated.body.title &&
        b.author === blogCreated.body.author &&
        b.url === blogCreated.body.url &&
        b.likes === blogCreated.body.likes &&
        b.user.toString() === userFound._id.toString()
      );
    });

    expect(blogExists).toBe(true);
    const blogCreatedId = blogCreated.body.id;
    const query = User.findById(userFound._id.toString());
    const userSelected = await query.exec();
    expect(userSelected.blogs.toString()).toContain(blogCreatedId);
  });

  test("added a valid blog but without a token", async () => {
    const blog = {
      title: "New Blog",
      url: "www.newurl.com",
      likes: 10,
    };

    const headers = {
      Authorization: "Bearer ",
    };
    await api.post("/api/blogs").set(headers).send(blog).expect(401);
  });

  test("blog without likes property defaults to 0", async () => {
    const user = {
      username: "aushalten",
      password: "sekret",
    };

    const resultWithToken = await api.post("/api/login").send(user);
    const token = resultWithToken.body.token;

    const blog = {
      title: "New Blog",
      url: "www.newurl.com",
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const blogCreated = await api
      .post("/api/blogs")
      .set(headers)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const userFound = await User.findOne({ username: user.username });
    const blogExists = blogsAtEnd.some((b) => {
      return (
        b.title === blogCreated.body.title &&
        b.author === blogCreated.body.author &&
        b.url === blogCreated.body.url &&
        b.likes === 0 &&
        b.user.toString() === userFound._id.toString()
      );
    });

    expect(blogExists).toBe(true);
  });

  test("if title and url are missing, 400 is returned", async () => {
    const user = {
      username: "aushalten",
      password: "sekret",
    };

    const resultWithToken = await api.post("/api/login").send(user);
    const token = resultWithToken.body.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const blog = {
      likes: 10,
    };

    await api.post("/api/blogs").set(headers).send(blog).expect(400);
  });
});

describe("deletion of a blog", () => {
  beforeEach(async () => {
    // Add new user with a blog
    const passwordHashNewUser = await bcrypt.hash("1234", 10);
    const newUser = new User({
      username: "moon",
      passwordHash: passwordHashNewUser,
    });
    await newUser.save();
    const blog = new Blog({
      title: "Test",
      author: newUser.username,
      url: "https://test.com",
      likes: 12,
      user: newUser.id,
    });
    await blog.save();
  });

  test("deleting a blog succeeds with status code 204 if id is valid and user is authorized", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[2];

    const credentialsUser = {
      username: "moon",
      password: "1234",
    };

    const resultLogin = await api
      .post("/api/login")
      .send(credentialsUser)
      .expect(200);

    const token = resultLogin.body.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });

  test("deleting a blog succeeds with status code 401 if id is valid and user is not authorized", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[2];

    const credentialsUser = {
      username: "aushalten",
      password: "sekret",
    };

    const resultLogin = await api
      .post("/api/login")
      .send(credentialsUser)
      .expect(200);

    const token = resultLogin.body.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("deleting a blog with an account valid but fails with status code 400 if id is invalid but", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const credentialsUser = {
      username: "moon",
      password: "1234",
    };

    const resultLogin = await api
      .post("/api/login")
      .send(credentialsUser)
      .expect(200);

    const token = resultLogin.body.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const invalidId = "5a3d5da59070081a82a3445";
    await api.delete(`/api/blogs/${invalidId}`).set(headers).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(blogsAtStart);
  });
});

describe("updating a blog", () => {
  test("updating likes of a valid blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const UpdatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    console.log(UpdatedBlog.body);
    const blogsAtEnd = await helper.blogsInDb();
    const blogWithStringUser = blogsAtEnd.map((blog) => ({
      ...blog,
      user: blog.user.toString(),
    }));
    expect(blogWithStringUser).toContainEqual(UpdatedBlog.body);
  });

  test("updating likes of an invalid blog", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.put(`/api/blogs/${invalidId}`).send({ likes: 10 }).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  // console.log("Closed connection");
});
