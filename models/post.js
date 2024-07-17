const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, maxLength: 10000 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
});

// Middleware to update updated_at field before saving.
PostSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Virtual for Post' URL
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
