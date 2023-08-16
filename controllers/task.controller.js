const mongoose = require("mongoose");
const Task = require("../models/Task");
const taskController = {};

taskController.createTask = async (req, res, next) => {
  try {
    const { name, description, assignee } = req.body; // Extract data from the request body

    const newTask = new Task({
      name: name,
      description: description,
      assignee: assignee,
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

taskController.getTasks = async (req, res, next) => {
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

    const tasks = await Task.find(filter).sort(sort).populate("assignedTo");

    res.json({
        message: "Get Task List Successfully",
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
    // Save the updated user to the database
    const updatedTask = await task.save();

    // Respond with the success message and the updated user data
    res.json({
      message: "Update Task Successfully!",
      task: Task.updatedTask,
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
    // Delete the task from the database
    await task.remove();

    // Respond with the success message and the deleted task data
    res.json({
      message: "Delete Task Successfully",
      task,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

module.exports = taskController;
