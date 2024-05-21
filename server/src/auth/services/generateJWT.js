const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(username, role = null) {
  let payload = "";
  try {
    const secretKey = process.env.JWT_SECRET;
    payload = {
      username: username,
      role: role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "10m" });
    return { token };
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
