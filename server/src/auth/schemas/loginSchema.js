module.exports = loginSchema = {
  schema: {
    tags: ["Authentication"],
    summary: "User Login",
    description: "Authenticate user login credentials",
    consumes: ["application/json"],
    produces: ["application/json"],
    body: {
      type: "object",
      properties: {
        username: { type: "string", description: "User's username" },
        password: { type: "string", description: "User's password" },
      },
      required: ["username", "password"],
    },
    response: {
      200: {
        description: "Successful login",
        type: "object",
        properties: {
          username: { type: "string", description: "User's username" },
          accessToken: {
            type: "object",
            properties: {
              token: { type: "string", description: "Access token" },
              expiresAt: {
                type: "string",
                format: "date-time",
                description: "Access token expiration time",
              },
            },
          },
          refreshToken: {
            type: "object",
            properties: {
              token: { type: "string", description: "Refresh token" },
              expiresAt: {
                type: "string",
                format: "date-time",
                description: "Refresh token expiration time",
              },
            },
          },
          email: {
            type: "object",
            properties: {
              adresse: { type: "string", description: "User's email address" },
            },
          },
          profile: {
            type: "object",
            properties: {
              firstName: { type: "string", description: "User's first name" },
              lastName: { type: "string", description: "User's last name" },
            },
          },
          status: { type: "string", description: "User's status" },
        },
      },
      422: {
        description: "Unregistered user",
        type: "object",
        properties: {
          status: { type: "string", description: "Status of the user" },
        },
      },
      401: {
        description: "Unauthorized",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
};
