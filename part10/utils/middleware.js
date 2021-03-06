const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorizationHeader = request.get("authorization");
  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith("bearer ")
  ) {
    const token = authorizationHeader.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    request.token = decodedToken;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const user = await User.findById(request.token.id);
    if (user) {
      request.user = user;
    } else {
      return response.status(400);
    }
  }
  next();
};

module.exports = {
  requestLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
