require("dotenv").config();
const ldap = require("ldapjs");
const httpStatus = require("http-status");
const ldapServices = require("../services/ldapServies");
const client = ldap.createClient({
  url: process.env.LDAP_URI,
});

const ladpController = {
  async disableAccount(request, reply) {
    try {
      // Ensure admin bind is successful before proceeding
      await new Promise((resolve, reject) => {
        client.bind(
          "uid=admin,ou=system",
          process.env.LDAP_ADMIN_PASSWORD,
          (err) => {
            if (err) {
              reject(new Error("LDAP admin bind failed :", err));
            } else {
              console.log("admin conntected successfully");
              resolve();
            }
          }
        );
      });

      const { username } = request.params;
      const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;

      ldapServices.disableUser(client, userDn, (err) => {
        if (err) {
          return reply.status(500).send({ error: "Failed to disable user" });
        }
        return reply
          .status(200)
          .send({ message: "User disabled successfully" });
      });
    } catch (error) {
      return reply.status(500).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async enableAccount(request, reply) {
    try {
      // Ensure admin bind is successful before proceeding
      await new Promise((resolve, reject) => {
        client.bind(
          "uid=admin,ou=system",
          process.env.LDAP_ADMIN_PASSWORD,
          (err) => {
            if (err) {
              reject(new Error("LDAP admin bind failed :", err));
            } else {
              console.log("admin conntected successfully");
              resolve();
            }
          }
        );
      });
      const { username } = request.params;
      const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;

      ldapServices.enableUser(client, userDn, (err) => {
        if (err) {
          return reply.status(500).send({ error: "Failed to disable user" });
        }
        return reply
          .status(200)
          .send({ message: "User disabled successfully" });
      });
    } catch (error) {
      return reply.status(500).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
};

module.exports = ladpController;
