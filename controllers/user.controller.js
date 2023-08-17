const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name, role } = req.body;

    // Validate the required fields using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!name || !role) {
      return res.status(400).json({ error: "Name and role fields are required." });
    }
  

    // Check if the name is already taken
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      throw new AppError(400, "Bad Request", "Username is already taken");
    }

    // Create the user object
    const newUser = new User({
      name,
      role,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success message and the created user data
    res.status(201).json({
      message: "Create User Successfully!",
      user: savedUser,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

userController.getUsers = async (req, res, next) => {
  try {
    const pageSize = 10; // Number of users to fetch per page
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters

    // Retrieve users for the requested page from the database
    const users = await User.find({ isDeleted: { $ne: true } })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Count total number of users in the database
    const totalUsers = await User.countDocuments({ isDeleted: { $ne: true } });

    // Calculate total number of pages based on the page size
    const totalPages = Math.ceil(totalUsers / pageSize);

    // Respond with the list of users, page number, and total number of pages
    res.json({
      message: "Get User List Successfully",
      users,
      page,
      total: totalPages,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

userController.getUserByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    // Find the user by name
    const user = await User.findOne({ name });

    if (!user) {
      throw new AppError(400, "User not found");
    }

    if (user.isDeleted) {
      return res.json({
        message: "This user has been deleted.",
        task: null,
      });
    }

    res.json({
      message: "Get User Successfully",
      user,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

userController.getAllTasksByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params; // Get the user ID from the URL parameter

    // Check if userId is a valid MongoDB ObjectId
    if (!isValidObjectId(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }

    // Fetch all tasks assigned to the specified user ID
    const tasks = await Task.find({
      assignee: userId,
      isDeleted: { $ne: true },
    });

    res.json({
      message: "Get All Tasks By UserId Successfully",
      tasks,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

userController.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if userId is a valid MongoDB ObjectId
    if (!isValidObjectId(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user properties based on the request body
    user.name = req.body.name || user.name;
    // Save the updated user to the database
    const updatedUser = await user.save();

    // Respond with the success message and the updated user data
    res.json({
      message: "Update User Successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

userController.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Check if userId is a valid MongoDB ObjectId
  if (!isValidObjectId(userId)) {
    throw new AppError(400, "Bad Request", "Invalid user ID");
  }  

  try {
    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Mark the user as deleted
    user.isDeleted = true;
    await user.save();

    // Respond with the success message and the updated user data
    res.json({
      message: "Delete User Successfully!",
      user,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

module.exports = userController;
