const { sendResponse, AppError } = require("../helpers/utils.js")
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CoderManagement' });
});

const userRouter = require("./user.api.js")
router.use("/users", userRouter)

const taskRouter = require("./task.api.js")
router.use("/tasks", taskRouter)

const { createTask, browseTasks, getTaskById, assignTask, updateTaskStatus, softDeleteTask } = require("../controllers/task.controllers.js");
const mongoose = require("mongoose");

// Custom validation function to check if the input is a valid MongoDB ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

/**
 * @route POST api/tasks
 * @description Create a task with the required information.
 * @access private, manager
 * @requiredBody: name, status, createdAt, updatedAt
 */
router.post(
  "/tasks",
  createTask
);

/**
 * @route GET api/tasks
 * @description Browse your tasks with filter allowance (name, status, createdAt,…).
 * @access private, manager
 * @allowedQueries: name, status, createdAt, updatedAt
 */
// router.get("/tasks", browseTasks);

// /**
//  * @route GET api/tasks/:taskId
//  * @description Get a single task by id.
//  * @access private, manager
//  * @param taskId - The ID of the task
//  */
// router.get("/tasks/:taskId", [param("taskId").custom(isValidObjectId)], getTaskById);

/**
 * @route POST api/tasks/:taskId/assign
 * @description Assign a task to a user or unassign them.
 * @access private, manager
 * @param taskId - The ID of the task
 * @requiredBody: assignedTo (employee id) or unassigned (boolean)
 */
router.post("/tasks/:taskId/assign", assignTask);

/**
 * @route PUT api/tasks/:taskId/status
 * @description Update the status of a task.
 * @access private, manager
 * @param taskId - The ID of the task
 * @requiredBody: status
 */
router.put("/tasks/:taskId/status", updateTaskStatus);

/**
 * @route DELETE api/tasks/:taskId
 * @description Soft delete a task.
 * @access private, manager
 * @param taskId - The ID of the task
 */
router.delete("/tasks/:taskId", softDeleteTask);

module.exports = router;




