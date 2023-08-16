const express = require('express');
const { createUser, getUsers, editUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

// CREATE
router.post('/', createUser);
// READ
router.get('/', getUsers);

// UPDATE
router.put('/:id', editUser);

// // DELETE
router.delete('/:id', deleteUser);

module.exports = router;
