const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

(async function() {
  try {
    await mongoose.connect(config.MONGODB_URI);
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

if (process.env.NODE_ENV === "development") {
  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established");
  });
}

app.use(cors());
// app.use(express.static("build"))
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  logger.info("MongoDB connection disconnected due to app termination");
  process.exit(0);
});

module.exports = app;
