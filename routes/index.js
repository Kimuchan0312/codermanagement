const express = require('express');
const router = express.Router();

// User
const userAPI = require('./user.api.js');
router.use('/users', userAPI);

// Task
const taskAPI = require('./task.api.js');
router.use('/tasks', taskAPI);

module.exports = router;
