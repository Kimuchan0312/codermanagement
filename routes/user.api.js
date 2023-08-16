const express = require('express');
const { createUser, getUsers, editUser, deleteUser, getUserByName } = require('../controllers/user.controller');
const router = express.Router();

// CREATE
router.post('/', createUser);
// READ
router.get('/', getUsers);
router.get('/name/:name', getUserByName); 

// UPDATE
router.put('/:id', editUser);

// // DELETE
router.delete('/:id', deleteUser);

module.exports = router;
