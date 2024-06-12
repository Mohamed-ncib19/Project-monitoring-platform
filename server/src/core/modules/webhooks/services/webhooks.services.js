require("dotenv").config();

const sprintServices = require("../../sprint/services/sprint.services");
const { createSprint } = require("../../tasks/services/task.services");
const zentaoServices = require("../../zentao/services/zentao.services");
const taskServices = require("../../tasks/services/task.services");

const webhooksServices = {
  async tasks(payload) {
    try {
      switch (payload.action) {
        case "opened":
          const sprintExists = await sprintServices.getSprintById(
            Number(payload.execution),
            "zentaoId"
          );
          let sprintId;
          if (!sprintExists.ok) {
            const zentaoSprint = await zentaoServices.getExecution(
              payload.execution
            );
            const createSprint = await sprintServices.createSprint(
              payload.execution,
              zentaoSprint
            );
            if (!createSprint) {
              return { ok: false, message: "failed to create sprint" };
            }
            sprintId = createSprint.id;
          } else {
            sprintId = sprintExists.sprint._id;
          }
          const task = await zentaoServices.getTask(payload.objectID);
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
            payload.execution
          );
          if (createTask.ok) {
            return { ok: true };
          }
          return { ok: false };
        default:
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
