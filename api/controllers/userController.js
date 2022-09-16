const File = require("../models/file");
const mongoose = require("mongoose");

exports.postLogin = (req, res, next) => {};
exports.getSignUpPage = (req, res, next) => {};
exports.getUserProfile = (req, res, next) => {};

exports.getPaperById = (req, res, next) => {
  const id = req.params.paperId;
  File.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.postUploadFile = (req, res, next) => {
  console.log("Reahed PostUploadFile");
  console.log(req.body);
  const file = new File({
    _id: new mongoose.Types.ObjectId(),
    filename: req.body.filename,
    subject: req.body.subject,
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
