const SprintModel = require("../models/sprint");
const TaskModel = require("../../tasks/models/task.js");
const { v4: uuidv4 } = require("uuid");
const projectServices = require("../../project/services/project.services");
const sprintServices = {
  async getSprintById(sprintId, type) {
    try {
      const sprintCollection = await SprintModel();
      const taskCollection = await TaskModel();
      const query = {};
      query[type] = Number(sprintId);
      const sprint = await sprintCollection.findOne(query);
      if (sprint) {
        const tasks = await taskCollection
          .find({
            sprint: sprintId,
          })
          .toArray();
        sprint.tasks = tasks;
        return { ok: true, data: sprint };
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
        progress: 0,
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
  async updateSprintProgress(sprintId) {
    try {
      const taskCollection = await TaskModel();
      const sprintCollection = await SprintModel();
      const sprint = await this.getSprintById(sprintId, "zentaoId");
      const tasks = await taskCollection
        .find({ sprint: sprint.data._id })
        .toArray();
      const totalTasks = tasks.length;
      const doneTasks = tasks.filter((task) => task.status === "done").length;
      const progress = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
      if (progress > 0 && sprint.data.status == "wait") {
        const updateSprintStatus = await sprintCollection.updateOne(
          { _id: sprint.data._id },
          { $set: { status: "doing" } }
        );
        if (!updateSprintStatus) {
          console.log("failed to update sprint status");
        }
      }
      const updateSprintProgress = await sprintCollection.updateOne(
        { _id: sprint.data._id },
        { $set: { progress } }
      );
      if (!updateSprintProgress) {
        console.log("failed to update sprint progress");
      }
      return { ok: true };
    } catch (err) {
      console.log(err);
      return { ok: false, message: err };
    }
  },
};
module.exports = sprintServices;
