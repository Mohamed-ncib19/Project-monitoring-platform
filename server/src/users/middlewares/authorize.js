// user/authorize.js
const authorize = (roles) => {
  return async (request, reply) => {
    try {
      if (!request.user) {
        throw new Error("User is not authenticated");
      }

      if (!roles.includes(request.user.role)) {
        throw new Error("Forbidden");
      }
      return;
    } catch (error) {
      reply.status(403).send({ error: "Forbidden" });
    }
  };
};

module.exports = authorize;
