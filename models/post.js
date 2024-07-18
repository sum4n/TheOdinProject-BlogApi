const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    content: { type: String, required: true, maxLength: 10000 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Virtual for Post' URL
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
