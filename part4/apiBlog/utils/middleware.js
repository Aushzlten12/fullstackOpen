const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.path);
  logger.info("Body:", request.body);
  logger.info("---");
  next();
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id);
      }
      next();
    } catch (error) {
      // Si el token es inválido o está ausente, simplemente continúa con el siguiente middleware
      next();
    }
  }
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return response
      .status(401)
      .json({ error: "Invalid or missing authorization header" });
  }
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  // logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
