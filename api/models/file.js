const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  subject: String,
  board: String,
  class: String,
  file: Buffer,
  type: String,
  approved: Boolean,
});

module.exports = mongoose.model("File", fileSchema);
