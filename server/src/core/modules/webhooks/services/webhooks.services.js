require("dotenv").config();

const sprintServices = require("../../sprint/services/sprint.services");
const { createSprint } = require("../../tasks/services/task.services");
const zentaoServices = require("../../zentao/services/zentao.services");
const taskServices = require("../../tasks/services/task.services");

const webhooksServices = {
  async tasks(payload) {
    try {
      const zentaoSprintId = payload.execution;
      const zentaoTaskId = payload.objectId;
      switch (payload.action) {
        case "opened":
          const sprintExists = await sprintServices.getSprintById(
            Number(zentaoSprintId),
            "zentaoId"
          );
          let sprintId;
          if (!sprintExists.ok) {
            const zentaoSprint = await zentaoServices.getExecution(
              zentaoSprintId
            );
            const createSprint = await sprintServices.createSprint(
              zentaoSprintId,
              zentaoSprint
            );
            if (!createSprint) {
              return { ok: false, message: "failed to create sprint" };
            }
            sprintId = createSprint.id;
          } else {
            sprintId = sprintExists.sprint._id;
          }
          let task = await zentaoServices.getTask(zentaoTaskId);
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
            zentaoSprintId
          );
          if (createTask.ok) {
            return { ok: true };
          }
          return { ok: false };
        case "edited":
          task = await zentaoServices.getTask(zentaoTaskId);
          if (!task.ok) {
            return {
              ok: false,
              message: "error getting task from zentao",
              details: task.message,
            };
          }
          const updateTask = await taskServices.updateTask(task.data);
          if (updateTask.ok) {
            return { ok: true };
          }
          return { ok: false, message: "failed to update task" };
      }
    } catch (error) {
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = webhooksServices;
