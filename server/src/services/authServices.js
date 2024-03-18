const ldap = require("ldapjs");
const generateToken = require("../utils/jwt");
const userModel = require("../models/UserModel");

async function userAuthenticate(email, password) {
  const userDn = `mail=${email},${process.env.LDAP_BASE_DN}`;

  try {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });

    // Bind to LDAP server
    await new Promise((resolve, reject) => {
      client.bind(userDn, password, (err) => {
        if (err) {
          client.unbind();
          reject({
            ok: false,
            message: `Invalid credentials: ${err.message}`,
            error: err,
          });
        } else {
          resolve();
        }
      });
    });
    // Generate JWT token upon successful authentication
    const token = generateToken(email);
    client.unbind();

    const userExists = await userModel.userExists(email);
    return {
      message: "Authentication successful",
      ok: true,
      token,
      exists: userExists.ok,
      email: userExists.ok ? userExists.user.email : null,
    };
  } catch (error) {
    console.error("LDAP authentication error:");
    return { ok: false, message: "Server error" };
  }
}

module.exports = { userAuthenticate };
