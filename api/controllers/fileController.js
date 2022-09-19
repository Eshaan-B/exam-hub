const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const File = require("../models/file");

exports.getExplore = (req, res, next) => {
  res.render("explore");
};

exports.getAllFiles = async (req, res, next) => {
  const docs = await File.find({});
  console.log("hey");
  //  console.log(docs[1]["file"]);
  //Download it like this:
  res.status(200).send(docs[1]["file"]);
};

exports.getOneById = async (req, res, next) => {
  const paperId = new ObjectId(req.params.paperId);
  const doc = await File.find({ _id: paperId });
  if (doc != null) {
    console.log("File found");
    res
      .setHeader("Content-disposition", "attachment; filename=myfile.pdf")
      .send(doc[0]["file"]);
  } else {
    console.log("doc not found");
    res.redirect("/");
  }
};

exports.getUploadOrDownload = (req, res, next) => {
  const mode = req.query.mode;
  res.render("papers/uploadDownload", { mode: mode });
};

function savePaper(paperObject, paperEncoded) {
  if (paperEncoded == null) return;
  const paperUnencoded = JSON.parse(paperEncoded);
  if (paperUnencoded != null) {
    paperObject.file = new Buffer.from(paperUnencoded.data, "base64");
  }
}

exports.postUpload = (req, res, next) => {
  console.log("Reached PostUploadFile");
  const paper = new File({
    _id: new mongoose.Types.ObjectId(),
    filename: req.body.filename,
    subject: req.body.subject,
  });
  savePaper(paper, req.body.paper);
  console.log("Saving file....");
  paper
    .save()
    .then((result) => {
      //console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("File saved!");
  res.status(201).json({
    message: "Success",
    createdFile: paper,
  });
};
