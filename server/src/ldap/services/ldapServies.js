require("dotenv").config();

const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const ldap = require("ldapjs");

const ldapServices = {
  async bindUser(username, password) {
    const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });

    return new Promise((resolve) => {
      client.bind(userDn, password, (err) => {
        if (err) {
          console.log(err);
          client.unbind();
          resolve({ ok: false, message: err.message });
        } else {
          resolve({ ok: true, client });
        }
      });
    });
  },
  disableUser(client, dn, callback) {
    const change = new ldap.Change({
      operation: "replace",
      modification: {
        type: "pwdAccountLockedTime",
        values: ["000001010000Z"],
      },
    });
    client.modify(dn, change, (err) => {
      if (err) {
        console.error("Failed to disable user:", err);
        return callback(err);
      }
      console.log("User disabled successfully");
      callback(null);
    });
  },
  enableUser(client, dn, callback) {
    const change = new ldap.Change({
      operation: "delete",
      modification: {
        type: "pwdAccountLockedTime",
        values: [],
      },
    });
    client.modify(dn, change, (err) => {
      if (err) {
        console.error("Failed to enable user:", err);
        return callback(err);
      }
      console.log("User enabled successfully");
      callback(null);
    });
  },
};

module.exports = ldapServices;
