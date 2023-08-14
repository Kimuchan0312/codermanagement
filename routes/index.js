const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express")
const mongoose = require("mongoose");
const taskController = require("../controllers/task.controllers.js");
const userController = require("../controllers/user.controllers.js")


const routes = function() {
    const apiRoute = express.Router();

    apiRoute.route("/users").get(userController.getAllUsers);
    apiRoute.route("/user").post(userController.createUser);
    apiRoute.route("/user/:id")
    .delete(userController.deleteUserById)
    .put(userController.updateUserById)
    .get(userController.getUserById)
    apiRoute.route("/tasks").get(taskController.getAllTasks);
    apiRoute.route("/task").post(taskController.createTask);
    return apiRoute;
}

//export
module.exports = routes;
