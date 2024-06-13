require("dotenv").config();

const httpStatus = require("http-status");
const sprintServices = require("../services/sprint.services");
const sprintController = {
  async getSprint(req, res) {
    try {
      const { sprintId } = req.params;
      const response = await sprintServices.getSprintById(sprintId, "_id");

      if (response.ok) {
        return res.status(httpStatus.OK).send({ sprint: response.sprint });
      }
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "sprint not found", details: response.message });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  },
};
module.exports = sprintController;
