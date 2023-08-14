const express = require("express");
const controllers = require('../controllers');
const mongoose = require("mongoose");

// Custom validation function to check if the input is a valid MongoDB ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const routes = function() {
  const apiRoute = express.Router();

  const taskController = controllers.taskController(db);
  apiRoute.route("/tasks").get(taskController.getAllTask);
  apiRoute.route("/task").post(taskController.createTask);
  apiRoute.route("/tasks/:id")
  .delete(taskController.deleteTaskById)
  .put(taskController.updateTaskStatus)
  .get(taskController.getTaskById)
  return apiRoute;
}

module.exports = routes;