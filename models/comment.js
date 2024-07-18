const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true, maxLength: 1000 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

// Middleware to update updated_at field before saving.
CommentSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Virtual for Comment's URL
CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
