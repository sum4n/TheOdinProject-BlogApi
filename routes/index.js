const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// GET index page
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}).exec();

    res.json({ users: allUsers });
  })
);

module.exports = router;
