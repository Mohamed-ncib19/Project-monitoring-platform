require("dotenv").config();

const ldap = require("ldapjs");
const ldapClient = require("../../../libs/ldap");

const webhooksServices = {
  async tasks(payload) {
    try {
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = webhooksServices;
