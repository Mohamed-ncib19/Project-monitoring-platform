const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const gitlabService = {
  async getGroups(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": process.env.GITLAB_ADMIN_TOKEN,
        },
      });

      if (!response.ok) {
        return {
          ok: false,
          message: "Failed to fetch groups from gitlab",
        };
      }
      const groups = await response.json();
      return {
        ok: true,
        groups: groups,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Failed to retrieve projects",
      };
    }
  },
  async getGroupProjects(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": process.env.GITLAB_ADMIN_TOKEN,
        },
      });
      if (!response.ok) {
        return {
          ok: false,
          message: "Failed to fetch projects from gitlab",
        };
      }
      const projects = await response.json();
      return {
        ok: true,
        projects: projects,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Failed to retrieve projects",
      };
    }
  },
};

module.exports = gitlabService;
