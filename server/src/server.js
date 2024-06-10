const Authroutes = require("./core/modules/auth/routes/auth.routes");
const userRoutes = require("./core/modules/users/routes/user.routes");
const projectRoutes = require("./core/modules/project/routes/project.routes");
const portfolioRoutes = require("./core/modules/portfolio/routes/portfolio.routes");
const productRoutes = require("./core/modules/product/routes/product.routes");
const webhooksRoute = require("./core/modules/webhooks/routes/webhooks.routes");

const {
  swaggerDescription,
  swaggerUiDescription,
} = require("./core/schemas/swagger");

const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("fastify-axios"));

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

fastify.register(portfolioRoutes);

fastify.register(productRoutes);

fastify.register(webhooksRoute);

const PORT = process.env.PORT;

async function start() {
  fastify.listen({ port: PORT, host: "0.0.0.0" });
}

start();
