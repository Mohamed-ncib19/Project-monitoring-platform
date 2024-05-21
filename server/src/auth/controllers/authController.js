const httpStatus = require("http-status");
const loginService = require("../services/loginService");
const registrationService = require("../services/registrationService");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../services/generateJWT");

require("dotenv").config();

const authController = {
  async login(request, reply) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        return reply.status(httpStatus.BAD_REQUEST).send({
          error: { message: "Missing username or password" },
          data: null,
        });
      }

      const response = await loginService(username, password);
      if (!response.ok) {
        return reply.status(httpStatus.UNAUTHORIZED).send({
          error: { message: "Invalid credentials" },
          data: null,
        });
      }
      return reply.status(httpStatus.OK).send({
        data: response,
        error: null,
      });
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async register(request, reply) {
    try {
      const user = request.body;
      if (!user) {
        return reply.status(httpStatus.BAD_REQUEST).send({
          error: { message: "Missing User data" },
          data: null,
        });
      }
      const response = await registrationService(user);

      if (!response.ok) {
        return reply.status(httpStatus.FORBIDDEN).send({
          error: { message: "Failed to register the user" },
          data: null,
        });
      }
      return reply
        .status(httpStatus.OK)
        .send({ error: null, data: response.user });
    } catch (e) {
      return reply
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: { message: "server error" }, data: null });
    }
  },
  async refreshToken(request, reply) {
    try {
      const refreshToken = request.body.refreshToken;
      if (!refreshToken) {
        reply
          .status(httpStatus.BAD_REQUEST)
          .send({ error: { message: "missing refresh token" }, data: null });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const newAccessToken = generateToken(decoded.username, decoded.role);
      console.log();
      reply.status(httpStatus.CREATED).send({
        data: {
          accessToken: newAccessToken.token,
        },
        error: null,
      });
    } catch (error) {
      reply
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: { message: "Invalid refresh token" }, data: null });
    }
  },
};

module.exports = authController;
