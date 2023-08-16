const mongoose = require("mongoose");
const User = require("../models/User");

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name } =
      req.body;

    // Validate the required fields
    if (
      !name
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create the user object
    const newUser = new User({
      name
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
    const users = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Count total number of cars in the database
    const totalUsers = await User.countDocuments();

    // Calculate total number of pages based on the page size
    const totalPages = await User.countDocuments();

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

userController.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

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
		message: 'Update User Successfully!',
		user: User.updatedUser,
	});
  } catch (err) {
    console.error('Error:', err);
	res.status(500).json({ error: 'An internal server error occured.'});
  }
};

userController.deleteUser = async (req, res, next) => {
  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await User.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete user success"
    );
  } catch (err) {
    next(err);
  }
};


module.exports = userController;
