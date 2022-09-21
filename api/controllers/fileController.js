const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const File = require("../models/file");
const checkExtension = require("../../utils/checkExtension");

exports.getExplore = (req, res, next) => {
  res.render("explore");
};

async function getAllFiles() {
  var docs = null;
  try {
    docs = await File.find({});
    console.log("Fetched files successfully");
  } catch (err) {
    console.log(`Error occured while fetching files.... ${err}`);
  }

  //  console.log(docs[1]["file"]);
  //Download it like this:
  return docs;
}

exports.getOneById = async (req, res, next) => {
  const paperId = new ObjectId(req.params.paperId);
  const doc = await File.find({ _id: paperId });
  const filename = await doc[0]["filename"];
  if (doc != null) {
    console.log("File found");
    console.log(typeof doc[0].file);
    res
      .setHeader("Content-disposition", `attachment; filename=${filename}`)
      .send(doc[0].file);
  } else {
    console.log("doc not found");
    res.redirect("/");
  }
};

exports.getUploadOrDownload = async (req, res, next) => {
  const mode = req.query.mode;
  let papers = [];
  if (mode === "download") {
    papers = await getAllFiles();
    if (papers.length == 0) console.log("no files to show");
    else console.log(`Length: ${papers.length}`);
  }
  console.log(req.extensionError);
  res.render("papers/uploadDownload", {
    mode: mode,
    papers: papers,
  });
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
  var filename = JSON.parse(req.body.paper).name;
  const extension = checkExtension(filename);
  if (extension == null) {
    req.extensionError = "Invalid file. Kindly upload pdf only";
    return res.status(301).render("error", {
      errorMessage:
        "Invalid file extension. Supported filetypes are: pdf, jpg, jpeg, png, doc, docx",
    });
  }
  const paper = new File({
    _id: new mongoose.Types.ObjectId(),
    type: extension,
    filename: filename,
    subject: req.body.subject,
    class: req.body.class,
    board: req.body.board,
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
  res
    .status(201)
    .render("success", {
      successMessage: "The file was uploaded successfully!",
    });
};
