const userServices = require("../modules//users/services/user.services"); // Assuming userServices is required from a specific file
const httpStatus = require("http-status");

const checkUserActive = async (request, reply) => {
  try {
    if (!request.user || !request.user.id) {
      return reply
        .status(httpStatus.FORBIDDEN)
        .send({ error: "User information missing" });
    }
    const userResponse = await userServices.userExists(request.user.id, 0);
    if (!userResponse.ok || !userResponse.exists || !userResponse.user.active) {
      return reply.status(httpStatus.FORBIDDEN).send({ error: "User Banned" });
    }
  } catch (error) {
    console.log(`Error in checkUserActive: ${error}`);
    return reply.status(httpStatus.FORBIDDEN).send({ error: "Banned" });
  }
};

module.exports = checkUserActive;
