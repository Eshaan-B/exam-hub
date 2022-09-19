const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  subject: String,
  file: Buffer,
});

module.exports = mongoose.model("File", fileSchema);
