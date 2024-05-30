require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateToken = function generateToken(username, role = null) {
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
};
module.exports = generateToken;
