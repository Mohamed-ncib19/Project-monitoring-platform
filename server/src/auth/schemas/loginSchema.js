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
          data: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                description: "Indicates if login was successful",
              },
              statusCode: {
                type: "integer",
                description: "Status code of the response",
              },
              tokens: {
                type: "object",
                properties: {
                  token: { type: "string", description: "Access token" },
                  refreshToken: {
                    type: "string",
                    description: "Refresh token",
                  },
                },
              },
              exists: {
                type: "boolean",
                description: "Indicates if the user exists",
              },
              pending: {
                type: ["null", "boolean"],
                description: "Indicates if the user is pending",
              },
            },
          },
          error: { type: "null", description: "Error message" },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: {
          data: { type: "null", description: "Response data" },
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        type: "object",
        properties: {
          data: { type: "null", description: "Response data" },
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
          data: { type: "null", description: "Response data" },
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
  },
};
