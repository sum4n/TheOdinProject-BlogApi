const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// REST API for Users.

// GET all users.
router.get("/users", user_controller.all_users);

// GET specific user.
router.get("/users/:userId", user_controller.user_specific);

// Create new user.
router.post("/users", user_controller.user_create);

// Update a specific user.
router.put("/users/:userId", user_controller.user_update);

// Delete a specific user.
router.delete("/users/:userId", user_controller.user_delete);

module.exports = router;
