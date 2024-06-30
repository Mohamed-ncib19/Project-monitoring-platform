require("dotenv").config();

const httpStatus = require("http-status");
const webhooksServices = require("../services/webhooks.services");
const webhooksController = {
  async handlePayload(req, res) {
    console.log("Received webhook");
    const payload = req.body;
    console.log(payload);
    const type = payload.objectType;
    let response;

    try {
      switch (type) {
        case "task":
          response = await webhooksServices.tasks(payload);
          break;
        case "bug":
          response = await webhooksServices.bugs(payload);
          break;
        default:
          console.log("Unknown webhook type");
          return res
            .status(httpStatus.NOT_FOUND)
            .json({ message: "Unknown webhook type" });
      }

      if (response.ok) {
        console.log("Webhook handled successfully");
        return res.status(httpStatus.OK).send({ message: "Success" });
      } else {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Error handling webhook" });
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    }
  },
};
module.exports = webhooksController;
