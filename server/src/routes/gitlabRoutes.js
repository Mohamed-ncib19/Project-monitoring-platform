const gitlabController = require("../controllers/gitlabController");
const {
  gitlabGroupsSchema,
  gitlabProjectSchema,
} = require("../schemas/swaggerGitlab");

async function routes(fastify, options) {
  //Display all gitlab groups
  fastify.get("/gitlab/groups", gitlabGroupsSchema, gitlabController.getGroups);

  //Display all gitlab group projects
  fastify.get(
    "/gitlab/groups/:groupId/projects",
    gitlabProjectSchema,
    gitlabController.getGroupProjects
  );

  fastify.get(
    "/gitlab/groups/:groupId/members",
    gitlabController.getGroupMembers
  );
}

module.exports = routes;
