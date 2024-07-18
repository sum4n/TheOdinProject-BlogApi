const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
exports.post_create = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified.")
    .isLength({ max: 400 })
    .withMessage("Must be within 400 character limit!"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified!"),
  // body("author")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Author must be specified!"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Get logged in user who must be admin.
    // TODO: get logged in admin user.
    const user = await User.find({ user_type: "admin" }).exec();

    // Create Post object with escaped and trimmed data.
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: user[0],
    });

    if (!errors.isEmpty()) {
      // There are errors. Send sanitized values and errors messages.
      res.json({ post, errors: errors.array() });
      return;
    } else {
      // Data is valid.
      // Save Post.
      await post.save();
      res.json({ message: "Post saved" });
    }
  }),
];

// Handle Post update on POST
exports.post_update = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified!")
    .isLength({ max: 400 })
    .withMessage("Must be within 400 character limit!"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content must be specified!"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Get logged in user who must be admin.
    // TODO: get logged in admin user.
    // const user = await User.find({ user_type: "admin" }).exec();

    // Create Post object with escaped and trimmed data.
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      // author: user[0],
      _id: req.params.postId,
    });

    if (!errors.isEmpty()) {
      // There are errors. Send sanitized values and errors messages.
      res.json({ post, errors: errors.array() });
    } else {
      // Data is valid.
      // Update the Post.
      await Post.findByIdAndUpdate(req.params.postId, post, {});
      res.json({ Message: "Post updated!" });
    }
  }),
];

// Handle Post on DELETE
exports.post_delete = asyncHandler(async (req, res, next) => {
  res.json("Delete a Post: Not implemented");
});
