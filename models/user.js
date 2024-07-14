const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 30 },
  last_name: { type: String, required: true, maxLength: 30 },
  username: { type: String, required: true, maxLength: 30 },
  email: {
    type: String,
    required: true,
    maxLength: 120,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true, maxLength: 120 },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "regular"],
    default: "regular",
  },
  joined_at: { type: Date, required: true, default: Date.now },
});

// Virtual for User's URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
