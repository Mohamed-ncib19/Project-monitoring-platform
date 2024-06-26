const httpStatus = require("http-status");
const authService = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const userService = require("../../users/services/user.services");
const ldapServices = require("../../users/services/ldap.services");
require("dotenv").config();

const authController = {
  async login(request, reply) {
    try {
      const { username, password } = request.body;
      const response = await authService.login(username, password);
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
      const { user } = await userService.userExists(username, 1);
      return reply.status(response.statusCode).send({
        id: user._id,
        accessToken: {
          token,
          expiresAt: tokenExpiresIn,
        },
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresIn,
        },
        profile: {
          username: user.username || null,
          firstName: user.firstname || null,
          lastName: user.lastname || null,
          email: user.email || null,
          bio: user.bio || null,
          businessPosition: user.businessPosition || null,
          role: user.role || null,
          avatar: user.avatar || null,
        },
        status: response.status,
      });
    } catch (error) {
      console.error(`Error in login method: ${error.message}`);
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
      const validLdapUser = await ldapServices.checkUserExists(
        userData.username
      );
      if (!validLdapUser.ok) {
        return reply.status(httpStatus.UNAUTHORIZED).send({
          error: { message: "The user does not exist in the LDAP" },
        });
      }
      const registerResponse = await authService.register(userData);
      if (!registerResponse.ok) {
        return reply.status(httpStatus.FORBIDDEN).send({
          error: { message: "User Already Exists" },
        });
      }
      const { token, tokenExpiresIn, refreshToken, refreshTokenExpiresIn } =
        registerResponse.tokens;
      return reply.status(httpStatus.OK).send({
        id: userData._id,
        accessToken: {
          token,
          expiresAt: tokenExpiresIn,
        },
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresIn,
        },
        profile: {
          username: userData.username || null,
          firstName: userData.firstname || null,
          lastName: userData.lastname || null,
          email: userData.email || null,
          bio: userData.bio || null,
          businessPosition: userData.businessPosition || null,
          role: userData.role || null,
          avatar: userData.avatar || null,
        },
        status: registerResponse.status,
      });
    } catch (error) {
      console.log(error);
      return reply
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: { message: "server error", details: error } });
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
      const newAccessToken = generateToken(decoded.id, decoded.role);
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
