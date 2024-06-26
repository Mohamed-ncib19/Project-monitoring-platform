const webhooksController = require("../controllers/webhooks.controller");

async function routes(fastify, options) {
  fastify.post("/webhook", webhooksController.handlePayload);
}

module.exports = routes;
