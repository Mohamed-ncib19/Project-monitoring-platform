require("dotenv").config();
const ldapController = require("../controllers/ldapController");

async function ldapRoutes(fastify, options) {
  fastify.post("/ldap/:username/disable", ldapController.disableAccount);
  fastify.post("/ldap/:username/enable", ldapController.enableAccount);
}

module.exports = ldapRoutes;
