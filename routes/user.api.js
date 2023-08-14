const express = require("express")
const controllers = require('../controllers');


const routes = function() {
    const apiRoute = express.Router();

    const userController = controllers.userController(db);
    apiRoute.route("/users").get(userController.getAllUser);
    apiRoute.route("/user").post(userController.createUser);
    apiRoute.route("/user/:id")
    .delete(userController.deleteUserById)
    .put(userController.updateUserById)
    .get(userController.getUserById)
    return apiRoute;
}

//export
module.exports = routes;