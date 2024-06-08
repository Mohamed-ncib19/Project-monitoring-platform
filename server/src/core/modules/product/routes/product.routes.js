require("dotenv").config();
const verifyJWT = require("../../../middlewares/verifyJWT");
const productController = require("../controllers/product.controller");
const checkUserActive = require("../../../middlewares/checkUserActive ");

async function routes(fastify, options) {
  //Create porfolio
  fastify.post("/products", {
    preHandler: [verifyJWT, checkUserActive],
    handler: productController.createProduct,
  });
  fastify.get("/products", {
    preHandler: [verifyJWT, checkUserActive],
    handler: productController.getProducts,
  });
  fastify.get("/:portfolioId/products", {
    preHandler: [verifyJWT, checkUserActive],
    handler: productController.getProducts,
  });
  fastify.put("/products/:productId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: productController.editProduct,
  });

  fastify.delete("/products/:productId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: productController.deleteProduct,
  });
}

module.exports = routes;
