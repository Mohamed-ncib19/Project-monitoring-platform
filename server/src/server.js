const Authroutes = require("./routes/authRoutes");
const gitlabRoutes = require("./routes/gitlabRoutes");

const { swaggerDescription } = require("./schemas/swagger");
const { swaggerUiDescription } = require("./schemas/swagger");
const fastify = require("fastify")({
  logger: true,
});
require("dotenv").config();

fastify.register(require("@fastify/swagger"), swaggerDescription);

fastify.register(require("@fastify/swagger-ui"), swaggerUiDescription);

fastify.register(Authroutes);

fastify.register(gitlabRoutes);

const PORT = process.env.PORT;

async function start() {
  fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    console.log(`Server is running `);

    if (err) throw err;
  });
}

start();
