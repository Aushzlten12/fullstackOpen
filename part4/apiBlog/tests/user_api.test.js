const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("./../app");
const helper = require("./test_helper");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const userAtStart = await User.find({});

    const newUser = {
      name: "jose",
      username: "jose123",
      password: "root123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // console.log(result);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);

    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      password: "salainen",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toMatch(/username/i) &&
      expect(response.body.error).toMatch(/unique/i);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("creation fails with proper statuscode and message if params not valid", () => {
  test("invalid username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "me",
      password: "root",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toContain(
      "username must be at least 3 characters",
    );

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);

    expect(usernames).not.toContain(newUser.username);
  });

  test("invalid password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "joseph",
      password: "ad",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toContain(
      "password must be at least 3 characters",
    );

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
