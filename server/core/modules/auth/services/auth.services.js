const generateToken = require("../utils/generateToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const userServices = require("../../users/services/user.services");
const httpStatus = require("http-status");
const ldapServices = require("../../users/services/ldap.services");

const authServices = {
  async register(user) {
    try {
      const createdUser = await userServices.createUser(user);
      if (!createdUser.ok) {
        return {
          ok: false,
        };
      } else {
        const tokenObject = generateToken(createdUser.userId);
        const token = tokenObject.token;
        const tokenExpiresIn = tokenObject.expiresIn;
        const refreshTokenObject = generateRefreshToken(
          user.username,
          user.exists ? user.role : null
        );
        const refreshToken = refreshTokenObject.refreshToken;
        const refreshTokenExpiresIn = refreshTokenObject.expiresIn;
        return {
          ok: true,
          statusCode: httpStatus.OK,
          tokens: {
            token,
            tokenExpiresIn,
            refreshToken,
            refreshTokenExpiresIn,
          },
          status: "pending",
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message, // Include error message in the response
      };
    }
  },
  async login(username, password) {
    try {
      const userBind = await ldapServices.bindUser(username, password);
      if (!userBind.ok) {
        console.error("LDAP authentication error:", userBind.message);
        return {
          ok: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: userBind.message,
        };
      }
      const userExistsResponse = await userServices.userExists(username, 1);
      if (userExistsResponse.exists) {
        const user = userExistsResponse.user;
        const tokenObject = generateToken(
          user._id,
          userExistsResponse.exists ? user.role : null
        );
        const token = tokenObject.token;
        const tokenExpiresIn = tokenObject.expiresIn;

        const refreshTokenObject = generateRefreshToken(
          user._id,
          userExistsResponse.exists ? user.role : null
        );
        const refreshToken = refreshTokenObject.refreshToken;
        const refreshTokenExpiresIn = refreshTokenObject.expiresIn;
        if (user.status == "approved") {
          return {
            ok: true,
            statusCode: httpStatus.OK,
            tokens: {
              token,
              tokenExpiresIn,
              refreshToken,
              refreshTokenExpiresIn,
            },
            status: "approved",
          };
        } else {
          return {
            ok: true,
            statusCode: httpStatus.OK,
            tokens: {
              token,
              tokenExpiresIn,
              refreshToken,
              refreshTokenExpiresIn,
            },
            status: "pending",
          };
        }
      } else {
        return {
          ok: false,
          statusCode: httpStatus.UNPROCESSABLE_ENTITY,
          status: "unregistred",
        };
      }
    } catch (error) {
      console.error("LDAP authentication error:", error);
      return {
        ok: false,
        message: error,
      };
    }
  },
};

module.exports = authServices;
