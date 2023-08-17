const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  editTask,
  deleteTask,
  unassignTask
} = require("../controllers/task.controller");
const { body } = require('express-validator'); 
const router = express.Router();

// Middleware to validate the task creation request
const validateTask =  [
    body("name").notEmpty().withMessage("Name is required."),
    body("description").notEmpty().withMessage("Description is required."),
    body("status")
      .notEmpty().withMessage("Status is required.")
      .custom((value, { req }) => {
        // Check if the current status is "archive" and new status is not "archive"
        if (req.body.status !== "archive" && value === "archive") {
          throw new Error("Cannot change status from 'archive' to another status.");
        }
        return true;
      })
      .isIn(["pending", "working", "review", "done", "archive"])
      .withMessage("Invalid status value. Status must be one of: pending, working, review, done, archive."),
  ];

// CREATE
router.post("/", validateTask, createTask);
// READ
router.get("/", getAllTasks);
router.get("/:id", getTaskById);

// UPDATE
router.put("/:id", editTask);
router.put("/:id/unassign", unassignTask);

// // DELETE
router.delete("/:id", deleteTask);

module.exports = router;
