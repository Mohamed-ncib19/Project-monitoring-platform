const userServices = require("../modules//users/services/user.services"); // Assuming userServices is required from a specific file

const checkUserActive = async (request, reply) => {
  try {
    const userResponse = await userServices.userExists(request.user.username);
    if (!userResponse.ok || !userResponse.exists || !userResponse.user.active) {
      return reply.status(403).send({ error: "Banned" });
    }
  } catch (error) {
    console.log(error);
    return reply.status(403).send({ error: "Banned" });
  }
};

module.exports = checkUserActive;
