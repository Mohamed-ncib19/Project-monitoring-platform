module.exports = registerSchema = {
  schema: {
    tags: ["Authentication"],
    summary: "User Registration",
    description: "Register a new user",
    consumes: ["application/json"],
    produces: ["application/json"],
    body: {
      type: "object",
      properties: {
        // Define properties of the user object here
        firstname: { type: "string", description: "User's first name" },
        lastname: { type: "string", description: "User's last name" },
        email: {
          type: "string",
          format: "email",
          description: "User's email address",
        },
        phoneNumber: {
          type: "string",
          pattern: "^[0-9]{10}$",
          description: "User's phone number (10 digits)",
        },
        password: { type: "string", description: "User's password" },
      },
      required: ["firstname", "lastname", "email", "phoneNumber", "password"], // Adjust required fields accordingly
    },
    response: {
      200: {
        description: "Successful registration",
        type: "object",
        properties: {
          error: { type: "null", description: "Error message" },
          data: {
            type: "object",
            properties: {
              response: {
                type: "object",
              },
            },
          },
        },
      },
      403: {
        description: "Failed to register the user",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
          data: { type: "null", description: "User data" },
        },
      },
      400: {
        description: "Bad request - Missing User data",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
          data: { type: "null", description: "User data" },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          error: { type: "object", description: "Error message" },
          data: { type: "null", description: "User data" },
        },
      },
    },
  },
};
