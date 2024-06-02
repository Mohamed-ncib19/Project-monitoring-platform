const jwt = require("jsonwebtoken");
const userServices = require("../../core/modules/users/services/user.services");
const authenticate = async (request, reply) => {
  try {
    const token = request.headers["authorization"];
    if (!token) {
      reply.status(401).send({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;

    const userResponse = await userServices.userExists(request.user.username);
    if (!userResponse.ok || !userResponse.exists || !userResponse.user.active) {
      reply.status(401).send({ error: "Unauthorized" });
    }

    return;
  } catch (error) {
    console.log(error);
    reply.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
