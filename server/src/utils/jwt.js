const jwt = require("jsonwebtoken");
const config = require("../../config");

function generateToken(email) {
  try {
    const secretKey = config.JWT_SECRET;
    const payload = {
      email: email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
}

module.exports = generateToken;
