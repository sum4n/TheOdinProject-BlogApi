const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// Retrieve list of all Posts
exports.all_posts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .sort({ created_at: 1 })
    .populate("author")
    .exec();
  res.json({ allPosts });
});

// Retrieve specific Post on GET
exports.post_specific = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
    .populate("author")
    // Populates comments and their authors.
    .populate({ path: "comments", populate: { path: "author", model: "User" } })
    .exec();
  res.json({ post });
});

// Handle Post create on POST
exports.post_create = asyncHandler(async (req, res, next) => {
  res.json("Create a Post: Not implemented");
});

// Handle Post update on POST
exports.post_update = asyncHandler(async (req, res, next) => {
  res.json("Update a Post: Not implemented");
});

// Handle Post on DELETE
exports.post_delete = asyncHandler(async (req, res, next) => {
  res.json("Delete a Post: Not implemented");
});
