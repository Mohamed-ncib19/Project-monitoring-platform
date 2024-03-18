const { userAuthenticate } = require("../services/authServices");

const authController = {
  async login(request, reply) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return reply
          .status(400)
          .send({ ok: false, message: "Missing email or password" });
      }

      const response = await userAuthenticate(email, password);
      console.log("\nresponse from controller : ", response, "\n");
      if (response.ok) {
        reply.status(200).send(response);
      } else {
        reply.status(403).send({
          ok: false,
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      reply.status(500).send({ ok: false, message: "Internal server error" });
    }
  },
};

module.exports = authController;
