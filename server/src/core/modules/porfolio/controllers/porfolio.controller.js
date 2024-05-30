require("dotenv").config();

const httpStatus = require("http-status");
const porfolioServices = require("../services/porfolio.services");
const porfolioController = {
  async createPorfolio(request, reply) {
    try {
      const porfolioData = request.body;
      const existResponse = await porfolioServices.porfolioExists(
        porfolioData.name
      );
      if (!existResponse.exists) {
        const createResponse = await porfolioServices.createporfolio(
          porfolioData
        );
        if (createResponse.ok) {
          return reply
            .status(httpStatus.OK)
            .send({ message: "porfolio created successfuly" });
        } else {
          return reply
            .status(httpStatus.NOT_FOUND)
            .send({ message: "failed to create porfolio" });
        }
      } else {
        return reply.status(httpStatus.CONFLICT).send({
          error: { message: "porfolio name already taken" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
};

module.exports = porfolioController;
