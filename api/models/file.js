const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    filename: String,
    subject: String,
    board: String,
    grade: String,
    year: String,
    files: [Buffer],
    description: { type: String, default: "No description" },
    type: String,
    approved: Boolean,
    user: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
