const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");

// REST API for Posts.

// GET all posts.
router.get("/posts", post_controller.all_posts);

// GET specific post.
router.get("/posts/:postId", post_controller.post_specific);

// Create new post.
router.post("/posts", post_controller.post_create);

// Update a specific post.
router.put("/posts/:postId", post_controller.post_update);

// Delete a specific post.
router.delete("/posts/:postId", post_controller.post_delete);

module.exports = router;
