require("dotenv").config();

const httpStatus = require("http-status");
const webhooksServices = require("../services/webhooks.services");
const webhooksController = {
  async handlePayload(req, res) {
    console.log("received webhook");
    const payload = req.body;
    console.log(payload);
    const type = payload.objectType;

    let response;
    switch (type) {
      case "task":
        response = webhooksServices.tasks(payload);
        break;
      case "bug":
        response = webhooksServices.bugs(payload);
        break;
      default:
        return res
          .status(httpStatus.NOT_FOUND)
          .message({ message: "unkown webhook type" });
    }
    if (response.ok) {
      console.log("webhook handled successfuly");
      return res.status(httpStatus.OK);
    }
  },
};
module.exports = webhooksController;
