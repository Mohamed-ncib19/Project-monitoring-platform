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
      let task;

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
              return { ok: false, message: "Failed to create sprint" };
            }

            sprintId = createSprint.id;
          } else {
            sprintId = sprintExists.data._id;
          }

          task = await zentaoServices.getTask(taskZentaoId);

          if (!task.ok) {
            return {
              ok: false,
              message: "Error getting task from Zentao",
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
              sprintZentaoId,
              payload.action
            );
            console.log(updateProgress);
          } else {
            return { ok: false, message: "Failed to create task" };
          }

          break;

        case "edited":
        case "started":
        case "finished":
          task = await zentaoServices.getTask(taskZentaoId);

          if (!task.ok) {
            return {
              ok: false,
              message: "Error getting task from Zentao",
              details: task.message,
            };
          }

          const updateTask = await taskServices.updateTask(task.data);

          if (updateTask.ok) {
            const updateProgress = await sprintServices.updateSprintProgress(
              sprintZentaoId,
              payload.action
            );
            console.log(updateProgress);
          } else {
            return { ok: false, message: "Failed to update task" };
          }

          break;

        default:
          console.log("Unknown action type");
          return { ok: false, message: "Unknown action type" };
      }

      return { ok: true };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = webhooksServices;
