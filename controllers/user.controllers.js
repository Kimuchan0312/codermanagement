const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");

const userController = (DATABASE) => {
  //Create a user

  const createUser = async (req, res, next) => {
    try {
      const { name, role = "employee" } = await req.body; // Get name and role from the request body
  
      // Validate input
      if (!name) {
        throw new AppError(400, "Bad Request", "Name is required");
      }
  
      // Create a new user
      const newUser = new User({
        name,
        role,
      });
  
      // Save the user to the database
      const createdUser = await newUser.save();
  
      // Send response
      sendResponse(
        res,
        201,
        true,
        { data: createdUser },
        null,
        "User created successfully"
      );
    } catch (err) {
      next(err);
    }
  };

  //Get all users
  const getAllUsers = async (req, res, next) => {
    const filter = {};
    try {
      //mongoose query
      const listOfFound = await User.find(filter);
      sendResponse(
        res,
        200,
        true,
        { data: listOfFound },
        null,
        "Found list of users success"
      );
    } catch (err) {
      next(err);
    }
  };

  //Update a user

  const updateUserById = async (req, res, next) => {
    //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
    //you will also get updateInfo from req
    // empty target and info mean update nothing
    const targetId = null;
    const updateInfo = "";

    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };
    try {
      //mongoose query
      const updated = await User.findByIdAndUpdate(
        targetId,
        updateInfo,
        options
      );
      sendResponse(
        res,
        200,
        true,
        { data: updated },
        null,
        "Update user success"
      );
    } catch (err) {
      next(err);
    }
    //Delete a user

    const deleteUserById = async (req, res, next) => {
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

  return {
    createUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
  };
};
}
//export
module.exports = userController;
