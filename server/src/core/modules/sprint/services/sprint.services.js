const SprintModel = require("../models/sprint");
const TaskModel = require("../../tasks/modules/task.js");

const { v4: uuidv4 } = require("uuid");
const projectServices = require("../../project/services/project.services");
const sprintServices = {
  async getSprintById(sprintId, type) {
    try {
      const sprintCollection = await SprintModel();
      const taskCollection = await TaskModel();

      const query = {};
      query[type] = sprintId;
      const sprint = await sprintCollection.findOne(query);
      if (sprint) {
        const tasks = await taskCollection
          .find({
            sprint: sprintId,
          })
          .toArray();
        sprint.tasks = tasks;
        return { ok: true, sprint };
      } else {
        return { ok: false, message: "sprint not found" };
      }
    } catch (error) {
      console.log(error.message);
      return { ok: false, message: error };
    }
  },
  async createSprint(zentaoId, sprint) {
    try {
      const { data } = sprint;
      const sprintCollection = await SprintModel();
      const id = uuidv4();
      const projectRes = await projectServices.getProject(
        "zentaoId",
        data.project
      );
      if (!projectRes.ok) {
        return { ok: false, message: "sprint parent not found" };
      }
      const { project } = projectRes;
      const insertSprint = await sprintCollection.insertOne({
        _id: id,
        zentaoId: parseInt(zentaoId),
        project: project._id,
        projectZentaoId: parseInt(data.project),
        name: data.name,
        begin: data.begin,
        end: data.end,
        realBegan: data.realBegan,
        realEnd: data.realEnd,
        status: data.status,
        desc: data.desc,
        createdAt: data.openedDate,
        tasks: [],
      });
      if (insertSprint.acknowledged) {
        return {
          ok: true,
          message: "sprint created successfully",
          id: insertSprint.insertedId,
        };
      }
    } catch (error) {
      console.log(error.message);
      return { ok: false, message: error };
    }
  },
  async getSprints(project){

  }
};

module.exports = sprintServices;
