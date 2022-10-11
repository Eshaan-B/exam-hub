const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  subject: String,
  board: String,
  grade: String,
  files: [Buffer],
  type: String,
  approved: Boolean,
  user: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("File", fileSchema);
