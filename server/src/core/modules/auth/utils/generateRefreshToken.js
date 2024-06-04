require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateRefreshToken = function generateRefreshToken(id, role = null) {
  try {
    const secretKey = process.env.JWT_REFRESH_SECRET;
    const payload = {
      id: id,
      role: role,
    };

    const expiresIn = "7d"; // Set the expiration time to 7 days

    // Calculate the expiration date
    const now = new Date();
    const expirationDate = new Date(
      now.getTime() + parseInt(expiresIn) * 24 * 60 * 60 * 1000 // Convert days to milliseconds
    );

    // Sign the token with expiration date
    const refreshToken = jwt.sign(
      { ...payload, exp: Math.floor(expirationDate.getTime() / 1000) },
      secretKey
    );
    return { refreshToken, expiresIn: expirationDate };
  } catch (error) {
    console.error("Error generating refresh token:", error);
    return { ok: false };
  }
};
module.exports = generateRefreshToken;
