const express = require('express');
const { createTask, getTasks, editTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

// CREATE
router.post('/', createTask);
// READ
router.get('/', getTasks);

// UPDATE
router.put('/:id', editTask);

// // DELETE
router.delete('/:id', deleteTask);

module.exports = router;
