const gitlabGroupsSchema = {
  schema: {
    tags: ["GitLab"],
    summary: "Get GitLab Groups",
    description: "Retrieve top-level groups from GitLab",
    consumes: ["application/json"],
    produces: ["application/json"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer", description: "The ID of the group" },
            name: { type: "string", description: "The name of the group" },
            path: { type: "string", description: "The path of the group" },
            description: {
              type: "string",
              description: "The description of the group",
            },
            visibility: {
              type: "string",
              description:
                "The visibility of the group (public, internal, or private)",
            },
            web_url: {
              type: "string",
              description: "The web URL of the group",
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Operation message" },
        },
      },
    },
  },
};

const gitlabProjectSchema = {
  schema: {
    tags: ["GitLab"],
    summary: "Get GitLab Projects by group ID",
    description: "Retrieve projects belonging to a specific GitLab group",
    consumes: ["application/json"],
    produces: ["application/json"],
    params: {
      type: "object",
      properties: {
        groupId: { type: "string", description: "The ID of the group" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer", description: "The ID of the project" },
            name: { type: "string", description: "The name of the project" },
            description: {
              type: "string",
              description: "The description of the project",
            },
            web_url: {
              type: "string",
              description: "The web URL of the project",
            },
          },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
      404: {
        description: "Not found",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
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

module.exports = { gitlabGroupsSchema, gitlabProjectSchema };
