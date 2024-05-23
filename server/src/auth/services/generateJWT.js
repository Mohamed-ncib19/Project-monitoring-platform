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

    return { token, expiresIn: expirationDate }; // Include expiresIn in the response
  } catch (error) {
    console.error("Error generating token:", error);
    return { ok: false };
  }
}

function generateRefreshToken(username, role = null) {
  try {
    const secretKey = process.env.JWT_REFRESH_SECRET; // Use a separate secret for refresh tokens
    const payload = {
      username: username,
      role: role,
    };
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "7d" }); // Expires in 7 days
    return { refreshToken };
  } catch (error) {
    console.error("Error generating refresh token:", error);
    return { ok: false };
  }
}

module.exports = { generateToken, generateRefreshToken };
