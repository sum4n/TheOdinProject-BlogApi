const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

// REST API for Comments.

// GET all Comments for a specific Post
router.get("/posts/:postId/comments", commentController.all_comments);

// GET specific Comment for a Post.
router.get(
  "/posts/:postId/comments/:commentId",
  commentController.comment_specific
);

// Create a new Comment for a Post.
router.post("/posts/:postId/comments", commentController.comment_create);

// Update specific Comment for a Post.
router.put(
  "/posts/:postId/comments/:commentId",
  commentController.comment_update
);

// Delete a specific Comment for a Post
router.delete(
  "/posts/:postId/comments/:commentId",
  commentController.comment_delete
);

module.exports = router;
