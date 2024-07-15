const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Retrive all users.
exports.all_users = asyncHandler(async (req, res, next) => {
  res.json("GET all Users: Not implemented");
});

// Retrive a specific User by id.
exports.user_specific = asyncHandler(async (req, res, next) => {
  res.json("GET specific User: Not implemented");
});

// Handle User create on POST.
exports.user_create = asyncHandler(async (req, res, next) => {
  res.json("Create a User: Not implemented");
});

// Handle User update on POST.
exports.user_update = asyncHandler(async (req, res, next) => {
  res.json("Update a User: Not implemented");
});

// Handle User on DELETE
exports.user_delete = asyncHandler(async (req, res, next) => {
  res.json("Delete a User: Not implemented");
});
