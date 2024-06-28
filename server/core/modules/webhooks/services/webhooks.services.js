require("dotenv").config();

const sprintServices = require("../../sprint/services/sprint.services");
const { createSprint } = require("../../tasks/services/task.services");
const zentaoServices = require("../../zentao/services/zentao.services");
const taskServices = require("../../tasks/services/task.services");

const webhooksServices = {
  async tasks(payload) {
    try {
      const sprintZentaoId = payload.execution;
      const taskZentaoId = payload.objectID;
      var task;
      switch (payload.action) {
        case "opened":
          const sprintExists = await sprintServices.getSprintById(
            Number(sprintZentaoId),
            "zentaoId"
          );
          let sprintId;
          if (!sprintExists.ok) {
            const zentaoSprint = await zentaoServices.getExecution(
              sprintZentaoId
            );
            const createSprint = await sprintServices.createSprint(
              sprintZentaoId,
              zentaoSprint
            );
            if (!createSprint.ok) {
              return { ok: false, message: "failed to create sprint" };
            }
            sprintId = createSprint.id;
          } else {
            sprintId = sprintExists.data._id;
          }
          task = await zentaoServices.getTask(taskZentaoId);
          if (!task.ok) {
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const createTask = await taskServices.createTask(
            task.data,
            sprintId,
            sprintZentaoId
          );
          if (createTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId
            );
            console.log(updateProgress);
            return { ok: true };
          }
          return { ok: false };
        case "edited":
          task = await zentaoServices.getTask(taskZentaoId);
          if (!task.ok) {
            console.log("error getting task from zentao");
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const updateTask = await taskServices.updateTask(task.data);
          if (updateTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId
            );
            console.log(updateProgress);
            return { ok: true };
          }
          console.log("failed to update task");
          return { ok: false, message: "failed to update task" };
        case "started":
          task = await zentaoServices.getTask(taskZentaoId);
          if (!task.ok) {
            console.log("error getting task from zentao");
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const startTask = await taskServices.updateTask(
            task.data,
            sprintZentaoId
          );
          if (startTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId
            );
            console.log(updateProgress);
            return { ok: true };
          }
          console.log("failed to update task");
          return { ok: false, message: "failed to update task" };
        case "finished":
          task = await zentaoServices.getTask(taskZentaoId);
          if (!task.ok) {
            console.log("error getting task from zentao");
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const finishTask = await taskServices.updateTask(
            task.data,
            sprintZentaoId
          );
          if (finishTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId
            );
            console.log(updateProgress);
            return { ok: true };
          }
          console.log("failed to update task");
          return { ok: false, message: "failed to update task" };
        case "closed":
          task = await zentaoServices.getTask(taskZentaoId);
          console.log(task);
          if (!task.ok) {
            console.log("error getting task from zentao");
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const closeTask = await taskServices.updateTask(
            task.data,
            sprintZentaoId
          );
          if (closeTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId
            );
            console.log(updateProgress);
            return { ok: true };
          }
          console.log("failed to update task");
          return { ok: false, message: "failed to update task" };
        default:
          break;
      }

      console.log(updateProgress);
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = webhooksServices;
