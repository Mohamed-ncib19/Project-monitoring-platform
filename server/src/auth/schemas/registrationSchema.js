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
        // Example properties:
        username: { type: "string", description: "User's username" },
        email: {
          type: "string",
          format: "email",
          description: "User's email address",
        },
        password: { type: "string", description: "User's password" },
      },
      required: ["username", "email", "password"], // Adjust required fields accordingly
    },
    response: {
      200: {
        description: "Successful registration",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          // Include any additional properties returned upon successful registration
        },
      },
      409: {
        description: "Conflict - User already exists",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Error message" },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Error message" },
        },
      },
    },
  },
};
