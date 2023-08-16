const mongoose = require("mongoose");
//Create schema
const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDeleted: { type: Boolean, default: false }
  });

//Create and export model
const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
