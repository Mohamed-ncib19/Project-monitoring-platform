const TaskModel = require("../models/task");
const { v4: uuidv4 } = require("uuid");
const projectServices = require("../../project/services/project.services");
const userServices = require("../../users/services/user.services");
const taskServices = {
  async createTask(task, sprintId, sprintZentaoId) {
    try {
      const taskCollection = await TaskModel();
      const id = uuidv4();
      const { user, ok } = await userServices.getUser(
        "username",
        task.assignedTo.account
      );
      if (!ok) {
        return { ok: false, message: "failed to get assignedTo user" };
      }
      console.log("user: ", user);
      console.log("task: ", task);
      const taskResult = await taskCollection.insertOne({
        _id: id,
        name: task.name,
        zentaoId: task.id,
        sprint: sprintId,
        sprintZentaoId,
        status: task.status,
        assignedTo: user._id,
        assignedDate: task.assignedDate,
        deadline: task.deadline,
        estimated: task.estimate,
        consumed: task.consumed,
        left: task.left,
        type: task.type,
        status: task.status,
        realStarted: task.realStarted,
        progress: task.progress,
        desc: task.desc,
      });
      if (taskResult.acknowledged) {
        return {
          ok: true,
          message: "task created successfully",
          id: taskResult.insertedId,
        };
      } else {
        return { ok: false, message: "failed to create task" };
      }
    } catch (error) {
      console.log(error.message);
      return { ok: false, message: error };
    }
  },
  async updateTask(task, sprintZentaoId) {
    try {
      const taskCollection = await TaskModel();
      const { user, ok } = await userServices.getUser(
        "zentaoId",
        task.assignedTo.id
      );
      if (!ok) {
        return { ok: false, message: "failed to get assignedTo user" };
      }
      const taskResult = await taskCollection.updateOne(
        { sprintZentaoId: sprintZentaoId },
        {
          $set: {
            name: task.name,
            status: task.status,
            assignedTo: user._id,
            assignedDate: task.assignedDate,
            deadline: task.deadline,
            estimated: task.estimate,
            consumed: task.consumed,
            left: task.left,
            type: task.type,
            status: task.status,
            realStarted: task.realStarted,
            progress: task.progress,
            desc: task.desc,
          },
        }
      );
      if (taskResult.acknowledged) {
        console.log("task updated successfully");
        return {
          ok: true,
          message: "task updated successfully",
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
