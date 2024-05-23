const ldap = require("ldapjs");
const { generateToken, generateRefreshToken } = require("./generateJWT");
const userServices = require("../../users/services/userServices");
const httpStatus = require("http-status");
const ldapServices = require("../../ldap/services/ldapServies");
async function loginService(username, password) {
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

    const userExistsResponse = await userServices.userExists(username);
    const tokenObject = generateToken(
      username,
      userExistsResponse.exists ? userExistsResponse.user.role : null
    );
    const token = tokenObject.token;

    const refreshTokenObject = generateRefreshToken(
      username,
      userExistsResponse.exists ? userExistsResponse.user.role : null
    );
    const refreshToken = refreshTokenObject.refreshToken;
    if (!userExistsResponse.exists) {
      return {
        ok: true,
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        tokens: { token, refreshToken },
        status: "unregistred",
      };
    } else if (userExistsResponse.user.status == "approved") {
      return {
        ok: true,
        statusCode: httpStatus.OK,
        tokens: { token, refreshToken },
        status: "approved",
      };
    } else {
      return {
        ok: true,
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        tokens: { token, refreshToken },
        status: "pending",
      };
    }
  } catch (error) {
    console.error("LDAP authentication error:", error);
    return {
      ok: false,
    };
  }
}

module.exports = loginService;
