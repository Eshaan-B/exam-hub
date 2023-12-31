const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: String,
  email: String,
  displayName: String,
  profilePicture: String,
  uploads: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", userSchema);
