const express = require('express');
const router = express.Router();
const { validationResult } = require("express-validator");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// User
const userAPI = require('./user.api.js');
router.use('/users', userAPI);

// Task
const taskAPI = require('./task.api.js');
router.use('/tasks', taskAPI);

module.exports = router;
