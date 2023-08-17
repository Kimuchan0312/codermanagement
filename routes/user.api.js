const express = require('express');
const { body } = require('express-validator'); 
const { createUser, getUsers, editUser, deleteUser, getAllTasksByUserId, getUserByName } = require('../controllers/user.controller');
const router = express.Router();

// Middleware to validate the task creation request
const validateUser = [
    body("name").notEmpty().withMessage("Name is required."),
    body("role")
      .notEmpty().withMessage("Role is required.")
      .isIn(["employee", "user"])
      .withMessage("Invalid role value. Role must be one of: employee, user."),
  ];

// CREATE
router.post('/', validateUser, createUser);
// READ
router.get('/', getUsers);
router.get('/name/:name', getUserByName); 
router.get('/:userId/tasks', getAllTasksByUserId);

// UPDATE
router.put('/:id', editUser);

// // DELETE
router.delete('/:id', deleteUser);

module.exports = router;
