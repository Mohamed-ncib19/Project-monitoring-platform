const jwt = require("jsonwebtoken");

const authenticate = async (request, reply) => {
  try {
    const token = request.headers["authorization"];

    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    return;
  } catch (error) {
    reply.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
