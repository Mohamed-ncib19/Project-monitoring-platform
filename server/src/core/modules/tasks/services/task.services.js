const TaskModel = require("../modules/task");
const { v4: uuidv4 } = require("uuid");
const projectServices = require("../../project/services/project.services");
const userServices = require("../../users/services/user.services");
const taskServices = {
  async createTask(task, sprintId, sprintZentaoId) {
    try {
      const taskCollection = await TaskModel();
      const id = uuidv4();
      const { user, ok } = await userServices.getUser(
        "zentaoId",
        task.assignedTo.id
      );
      console.log(user);
      if (!ok) {
        return { ok: false, message: "failed to get assignedTo user" };
      }
      const taskResult = await taskCollection.insertOne({
        _id: id,
        sprint: sprintId,
        sprintZentaoId,
        status: task.status,
        assignedTo: user._id,
        assignedDate: task.assignedDate,
        deadline: task.dealine,
        estimated: task.estimated,
        consumed: task.consumed,
        left: task.left,
        type: task.type,
        status: task.status,
        realStarted: task.realStarted,
        progress: task.progress,
      });
      if (taskResult.acknowledged) {
        return {
          ok: true,
          message: "task created successfully",
          id: taskResult.insertedId,
        };
      } else {
        return { ok: false, message: "failed to created task" };
      }
    } catch (error) {
      console.log(error.message);
      return { ok: false, message: error };
    }
  },
  async editTask(task, sprintId, sprintZentaoId) {
    try {
      const taskCollection = await TaskModel();
      const id = uuidv4();
      const { user, ok } = await userServices.getUser(
        "zentaoId",
        task.assignedTo.id
      );
      console.log(user);
      if (!ok) {
        return { ok: false, message: "failed to get assignedTo user" };
      }
      const taskResult = await taskCollection.update({
        _id: id,
        sprint: sprintId,
        sprintZentaoId,
        status: task.status,
        assignedTo: user._id,
        assignedDate: task.assignedDate,
        deadline: task.dealine,
        estimated: task.estimated,
        consumed: task.consumed,
        left: task.left,
        type: task.type,
        status: task.status,
        realStarted: task.realStarted,
        progress: task.progress,
      });
      if (taskResult.acknowledged) {
        return {
          ok: true,
          message: "task created successfully",
          id: taskResult.insertedId,
        };
      } else {
        return { ok: false, message: "failed to created task" };
      }
    } catch (error) {
      console.log(error.message);
      return { ok: false, message: error };
    }
  },
};

module.exports = taskServices;
