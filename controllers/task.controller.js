const mongoose = require("mongoose");
const Task = require("../models/Task");
const taskController = {};
const { validationResult } = require("express-validator");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

taskController.createTask = async (req, res, next) => {
  try {
    const { name, description, assignee } = req.body; // Extract data from the request body

    // Validate the required fields using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task({
      name: name,
      description: description,
      assignee: assignee,
      status: req.body.status || "pending",
    });

    const createdTask = await newTask.save();

    // Send a success response to the client
    res.status(201).json({
      success: true,
      data: createdTask,
      message: "Task created successfully",
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

taskController.getAllTasks = async (req, res, next) => {
  try {
    const { status, sortBy } = req.query;

    // Construct the filter object based on query parameters
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Construct the sort object based on query parameters
    const sort = {};
    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      sort[sortBy] = 1; // 1 for ascending order, -1 for descending order
    }

    // If no status parameter is provided, retrieve all tasks
    if (!status) {
      const allTasks = await Task.find({ isDeleted: { $ne: true } }).sort(sort)
      return res.json({
        message: "Get All Tasks Successfully",
        tasks: allTasks,
      });
    }

    // Retrieve tasks based on the provided status parameter
    const filteredTasks = await Task.find(filter)
      .sort(sort)
    res.json({
      message: "Get Task List Successfully",
      tasks: filteredTasks,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

taskController.getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    // Find the user by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    
    if (task.isDeleted) {
        return res.json({
          message: "This task has been deleted.",
          task: null,
        });
      }

    return res.json({
      message: "Get a Single Task By Id Successfully",
      task: task,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

taskController.getAllTasksByUserId = async (req, res, next) => {
    try {
      const { userId } = req.params; // Get the user ID from the URL parameter

      // Check if userId is a valid MongoDB ObjectId
    if (!isValidObjectId(userId)) {
        throw new AppError(400, "Bad Request", "Invalid user ID");
      }  
  
      // Fetch all tasks assigned to the specified user ID
      const tasks = await Task.find({ assignee: userId, isDeleted: { $ne: true } });

      res.json({
        message: "Get All Tasks By UserId Successfully",
        tasks
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

taskController.editTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    // Find the user by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    // Update the user properties based on the request body
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;

    // Check if the new status adheres to the rule
    if (task.status === "done" && req.body.status !== "archive") {
      return res.status(400).json({ error: "Invalid status update." });
    }

    task.status = req.body.status || task.status;
    task.assignee = req.body.assignee || task.assignee;

    // Save the updated user to the database
    const updatedTask = await task.save();

    // Respond with the success message and the updated user data
    res.json({
      message: "Update Task Successfully!",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    // Find the task by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    // Mark the user as deleted
    task.isDeleted = true;
    await task.save();

    // Respond with the success message and the updated user data
    res.json({
      message: "Delete Task Successfully!",
      task,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

module.exports = taskController;
