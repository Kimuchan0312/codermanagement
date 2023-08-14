const { sendResponse, AppError } = require("../helpers/utils.js");

const Task = require("../models/Task.js");

const taskController = (DATABASE) => {
//Create a task
const createTask = async (req, res, next) => {
  try {
  const info = {
    name: "task",
    description: "any task",
    assignee: "assignee",
  };
   if (!info) throw new AppError(400, "Bad Request", "Create Task Error");
    //in real project you must also check if id (referenceTo) is valid as well as if document with given id is exist before any futher process
    //mongoose query
    const created = await Task.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Task Success"
    );
  } catch (err) {
    next(err);
  }
};
//updatetask

const addReference = async (req, res, next) => {
  //in real project you will getting info from req
  const { targetName } = req.params;
  const { ref } = req.body;
  try {
    //always remember to control your inputs
    //in real project you must also check if id (referenceTo) is valid as well as if document with given id is exist before any futher process
    let found = await Task.findOne({ name: targetName });
    //add your check to control if boo is notfound
    const refFound = await User.findById(ref);
    //add your check to control if foo is notfound
    found.referenceTo = ref;
    //mongoose query
    found = await found.save();
    sendResponse(
      res,
      200,
      true,
      { data: found },
      null,
      "Add reference success"
    );
  } catch (err) {
    next(err);
  }
};

//Get all task

const getAllTasks = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  // empty filter mean get all
  const filter = {};
  try {
    //mongoose query
    const listOfFound = await Task.find(filter).populate("referenceTo");
    //this to query data from the reference and append to found result.
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "Found list of tasks success"
    );
  } catch (err) {
    next(err);
  }
};

return {
  createTask,
  addReference,
  getAllTasks
}

}

//export

module.exports = taskController;
