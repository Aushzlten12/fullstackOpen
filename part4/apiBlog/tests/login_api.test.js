const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("./../app");
const api = supertest(app);
const User = require("./../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("Log in with valid credentials", () => {
  test("succeeds with correct credentials", async () => {
    const userLoged = {
      username: "root",
      password: "sekret",
    };

    await api.post("/api/login").send(userLoged).expect(200);
  });

  test("fails with wrong credentials", async () => {
    const userLoged = {
      username: "root",
      password: "wrong",
    };

    await api.post("/api/login").send(userLoged).expect(401);
  });
});
