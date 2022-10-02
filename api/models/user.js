const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: String,
  email: String,
  displayName: String,
  profilePicture: String,
});

module.exports = mongoose.model("User", userSchema);
