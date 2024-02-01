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

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log(result);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);

    expect(usernames).toContain(newUser.username);
  });

  test("");
});
