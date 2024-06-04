const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const verifyJWT = async (request, reply) => {
  try {
    const token = request.headers["authorization"];
    if (!token) {
      return reply
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (error) {
    console.log(error);
    return reply
      .status(httpStatus.UNAUTHORIZED)
      .send({ error: "Unauthorized" });
  }
};

module.exports = verifyJWT;

module.exports = verifyJWT;
