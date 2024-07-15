const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// Retrieve all Comments for a specific Post.
exports.all_comments = asyncHandler(async (req, res, next) => {
  res.json("GET all Comments: Not implemented");
});

// Retrieve a specific Comment for a Post on GET.
exports.comment_specific = asyncHandler(async (req, res, next) => {
  res.json("GET specific Comment: Not implemented");
});

// Handle Comment create on POST.
exports.comment_create = asyncHandler(async (req, res, next) => {
  res.json("Create a comment: Not implemented");
});

// Handle Comment update on POST
exports.comment_update = asyncHandler(async (req, res, next) => {
  res.json("Update a Comment: Not implemented");
});

// Handle Comment on DELETE
exports.comment_delete = asyncHandler(async (req, res, next) => {
  res.json("Delete a Comment: Not implemented");
});
