const gitlabService = require("../services/gitlabService");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const gitlabController = {
  async getGroups(request, reply) {
    const url = `${process.env.GITLAB_BASE_URL}/groups?top_level_only=true`;
    try {
      const response = await gitlabService.getGroups(url);
      if (!response.ok) {
        reply.code(404).send({ error: "Failed to retrieve groups" });
      }
      reply.code(200).send(response.groups);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Failed to retrieve groups" });
    }
  },

  async getGroupProjects(request, reply) {
    const { groupId } = request.params;

    if (!groupId) {
      return reply.code(400).send({ error: "Invalid group ID format" });
    }

    const url = `${process.env.GITLAB_BASE_URL}/groups/${groupId}/projects/`;

    try {
      const response = await gitlabService.getGroupProjects(url);
      if (!response.ok) {
        reply.code(404).send({ error: "Failed to retrieve projects" });
      }
      reply.code(200).send(response.projects);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Failed to retrieve projects" });
    }
  },

  async getGroupMembers(request, reply) {
    const { groupId } = request.params;

    const url = `${process.env.GITLAB_BASE_URL}/groups/${groupId}/members`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": process.env.GITLAB_ADMIN_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error(
          `GitLab API request failed with status ${response.status}`
        );
      }

      const members = await response.json();
      reply.code(200).send(members);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Failed to retrieve members" });
    }
  },
};

module.exports = gitlabController;
