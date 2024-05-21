const userServices = require("../../users/services/userServices");

async function registrationService(user) {
  try {
    const createdUser = await userServices.createUser(user);
    return {
      ok: true,
      user: createdUser,
    };
  } catch (error) {
    console.error("Registration Service error", error);
    return {
      ok: false,
      error: error.message, // Include error message in the response
    };
  }
}

module.exports = registrationService;
