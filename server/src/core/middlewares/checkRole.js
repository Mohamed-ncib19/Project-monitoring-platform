const httpStatus = require("http-status");

const checkUserRole = (roles) => {
  return async (request, reply) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return reply
        .status(httpStatus.FORBIDDEN)
        .send({ error: "Forbidden: Insufficient role" });
    }
  };
};

module.exports = checkUserRole;
