const userServices = require("../../users/services/userServices");
const { generateToken, generateRefreshToken } = require("./generateJWT");
const httpStatus = require("http-status");

async function registrationService(user) {
  try {
    const createdUser = await userServices.createUser(user);
    if (!createdUser.ok) {
      return {
        ok: false,
      };
    } else {
      const tokenObject = generateToken(
        user.username,
        user.exists ? user.role : null
      );
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
}

module.exports = registrationService;
