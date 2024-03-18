const routes = require("./routes/authRoutes");
const config = require("../config");
const { swaggerDescription } = require("./schemas/swagger");
const { swaggerUiDescription } = require("./schemas/swagger");
const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("@fastify/swagger"), swaggerDescription);

fastify.register(require("@fastify/swagger-ui"), swaggerUiDescription);

fastify.register(routes);

const PORT = config.PORT || 3000;

async function start() {
  fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    console.log(`Server is running on ${fastify.server.address().port}`);

    if (err) throw err;
  });
}

start();
