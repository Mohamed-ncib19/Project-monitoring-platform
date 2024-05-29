const Authroutes = require("./auth/routes/authRoutes");
const userRoutes = require("./users/routes/userRoutes");
const projectRoutes = require("./project/routes/projectRoutes");
const porfolioRoutes = require("./porfolio/routes/porfolioRoutes");

const {
  swaggerDescription,
  swaggerUiDescription,
} = require("./core/schemas/swagger");

const fastify = require("fastify")({
  logger: true,
});

require("dotenv").config();

fastify.register(require("@fastify/cors"), {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
});

fastify.register(require("@fastify/swagger"), swaggerDescription);

fastify.register(require("@fastify/swagger-ui"), swaggerUiDescription);

fastify.register(Authroutes);

fastify.register(userRoutes);

fastify.register(projectRoutes);

fastify.register(porfolioRoutes);

const PORT = process.env.PORT;

async function start() {
  fastify.listen({ port: PORT, host: "127.0.0.1" });
}

start();
