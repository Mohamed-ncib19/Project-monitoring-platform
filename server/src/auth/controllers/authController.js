const httpStatus = require("http-status");
const loginService = require("../services/loginService");
const registrationService = require("../services/registrationService");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../services/generateJWT");
const userService = require("../../users/services/userServices");

require("dotenv").config();

const authController = {
  async login(request, reply) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        return reply.status(httpStatus.BAD_REQUEST).send({
          error: { message: "Missing username or password" },
        });
      }
      const response = await loginService(username, password);
      if (!response.ok) {
        if (response.status) {
          return reply.status(httpStatus.UNPROCESSABLE_ENTITY).send({
            status: "unregistred",
          });
        }
        return reply.status(httpStatus.UNAUTHORIZED).send({
          error: { message: "Invalid credentials" },
        });
      }
      const { token, tokenExpiresIn, refreshToken, refreshTokenExpiresIn } =
        response.tokens;
      const { user } = await userService.userExists(username);
      return reply.status(response.statusCode).send({
        username: username,
        accessToken: {
          token: token,
          expiresAt: tokenExpiresIn,
        },
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresIn,
        },
        profile: {
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          bio: user.bio ? user.bio : null,
          businessPosition: user.businessPosition
            ? user.businessPosition
            : null,
          role: user.role ? user.role : null,
          avatar: user.avatar ? user.avatar : null,
        },
        status: response.status,
      });
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async register(request, reply) {
    try {
      const userData = request.body;
      if (!userData) {
        return reply.status(httpStatus.BAD_REQUEST).send({
          error: { message: "Missing User data" },
        });
      }
      userData.username = request.user.username;
      const registerResponse = await registrationService(userData);
      if (!registerResponse.ok) {
        return reply.status(httpStatus.FORBIDDEN).send({
          error: { message: "Failed to register the user" },
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
      const { refreshToken } = request.body || {};
      if (!refreshToken) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ error: { message: "missing refresh token" } });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const newAccessToken = generateToken(decoded.username, decoded.role);
      reply.status(httpStatus.CREATED).send({
        accessToken: {
          token: newAccessToken.token,
          expiresAt: newAccessToken.expiresIn,
        },
      });
    } catch (error) {
      reply
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: { message: "Invalid refresh token" } });
    }
  },
};

module.exports = authController;
