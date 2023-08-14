const mongoose = require("mongoose");
//Create schema
const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type:String, required:true},
    referenceTo:{type: mongoose.SchemaTypes.ObjectId, ref: "Task"} //one to one optional
  },
  {
    timestamps: true,
  }
);
//Create and export model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;