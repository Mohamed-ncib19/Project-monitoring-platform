require("dotenv").config();

const jwt = require("jsonwebtoken");

function generateToken(username, role = null) {
  try {
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username: username,
      role: role,
    };

    const expiresIn = "10m"; // Set the expiration time

    // Calculate the expiration date
    const now = new Date();
    const expirationDate = new Date(
      now.getTime() + parseInt(expiresIn) * 60 * 1000
    );

    // Sign the token with expiration date
    const token = jwt.sign(
      { ...payload, exp: Math.floor(expirationDate.getTime() / 1000) },
      secretKey
    );

    return { token: token, expiresIn: expirationDate };
  } catch (error) {
    console.error("Error generating token:", error);
    return { ok: false };
  }
}

function generateRefreshToken(username, role = null) {
  try {
    const secretKey = process.env.JWT_REFRESH_SECRET;
    const payload = {
      username: username,
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
}

module.exports = { generateToken, generateRefreshToken };
