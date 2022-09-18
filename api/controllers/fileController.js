const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const File = require("../models/file");

exports.getExplore = (req, res, next) => {
  res.render("explore");
};

exports.getUploadOrDownload = (req, res, next) => {
  const mode = req.query.mode;
  res.render("papers/uploadDownload", { mode: mode });
};

exports.postUpload = (req, res, next) => {
  console.log("Reached PostUploadFile");
  console.log(req.file);
  //PARSING:

  const p = path.join(path.dirname(process.mainModule.filename), req.file.path);
  var paper = fs.readFileSync(p);
  var encode_file = paper.toString("base64");
  var final_file = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_file, "base64"),
  };

  //UPLOADING TO MONGO:
  const file = new File({
    _id: new mongoose.Types.ObjectId(),
    filename: req.body.filename,
    subject: req.body.subject,
    file: final_file,
  });
  console.log("Saving file....");
  file
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("File saved!");
  res.status(201).json({
    message: "Success",
    createdFile: file,
  });
};
