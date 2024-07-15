const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// Retrieve list of all Posts
exports.all_posts = asyncHandler(async (req, res, next) => {
  res.json("GET all Posts: Not implemented");
});

// Retrieve specific Post on GET
exports.post_specific = asyncHandler(async (req, res, next) => {
  res.json("GET specific Post: Not implemented");
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
