const express = require('express');
const { createTask, getAllTasks, getTaskById, getAllTasksByUserId, editTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

// CREATE
router.post('/', createTask);
// READ
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.get('/:userId/tasks', getAllTasksByUserId);

// UPDATE
router.put('/:id', editTask);

// // DELETE
router.delete('/:id', deleteTask);

module.exports = router;
