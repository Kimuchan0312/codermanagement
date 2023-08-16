const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["employee", "user"],
    default: "employee",
  },
  isDeleted: { type: Boolean, default: false }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
