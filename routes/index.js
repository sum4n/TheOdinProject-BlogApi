const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

// Import routers.
const postRouter = require("./post");
const commentRouter = require("./comment");
const userRouter = require("./user");

// Use imported routers.
router.use("/", postRouter);
router.use("/", commentRouter);
router.use("/", userRouter);

// GET index page
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const [allUsers, allPosts, allComments] = await Promise.all([
      User.find({}).exec(),
      Post.find({}).populate("comments").exec(),
      Comment.find({}).populate("author").exec(),
    ]);

    res.json({ users: allUsers, posts: allPosts, comments: allComments });
  })
);

module.exports = router;
