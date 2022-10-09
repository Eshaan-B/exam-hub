const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const File = require("../models/file");
const User = require("../models/user");
const checkExtension = require("../utils/checkExtension");
const savePaper = require("../utils/savePaper");
const file = require("../models/file");

exports.getExplore = (req, res, next) => {
  res.render("explore");
};

async function getByFilter(req) {}

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

async function getUserById(userId) {
  const doc = await User.find({ _id: userId });
  if (doc != null) return doc[0];
  console.log("User not found");
}

exports.getOneOfBatch = async (req, res, next) => {
  res.send(`Sending ${req.params.index}`);
};

exports.getOneById = async (req, res, next) => {
  const paperId = new ObjectId(req.params.paperId);
  const doc = await File.find({ _id: paperId });
  const filename = await doc[0]["filename"];
  if (doc != null) {
    console.log("File found");
    res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    let splitFileName = filename.split(" ");
    if (splitFileName === "Doc") {
      res.send(doc[0].files[splitFileName[1]]);
    } else {
      res
        .setHeader("Content-disposition", `attachment; filename=${filename}`)
        .send(doc[0].files[0]);
    }
  } else {
    console.log("doc not found");
    res.redirect("/");
  }
};

exports.getUploadOrDownload = async (req, res, next) => {
  console.log("User is: ", req.user);
  const mode = req.query.mode;
  let papers = [];
  if (mode === "download") {
    papers = await getAllFiles();
    if (papers.length == 0) console.log("no files to show");
    else console.log(`Length: ${papers.length}`);
  }
  res.render("papers/uploadDownload", {
    mode: mode,
    papers: papers,
    user: req.user,
    grade: "XII",
    board: req.body.board,
    subject: "Math",
  });
};

exports.postUpload = async (req, res, next) => {
  console.log("Reached PostUploadFile");
  const filesBuffer = [];
  if (typeof req.body.paper === "string") {
    filesBuffer.push(
      new Buffer.from(JSON.parse(req.body.paper).data, "base64")
    );
  } else {
    let papersJSON = req.body.paper;
    papersJSON.forEach((paper) => {
      let buff = new Buffer.from(JSON.parse(paper).data, "base64");
      filesBuffer.push(buff);
    });
  }
  var filename =
    filesBuffer.length == 1 ? JSON.parse(req.body.paper).name : "Doc";
  //const extension = checkExtension(filename);
  // if (extension == null) {
  //   req.extensionError = "Invalid file. Kindly upload pdf only";
  //   return res.status(301).render("error", {
  //     errorMessage:
  //       "Invalid file extension. Supported filetypes are: pdf, jpg, jpeg, png, doc, docx",
  //   });
  // }
  const paper = new File({
    _id: new mongoose.Types.ObjectId(),
    type: "tbd",
    filename: filename,
    subject: req.body.subject,
    class: req.body.class,
    board: req.body.board,
    approved: false,
    user: mongoose.Types.ObjectId(req.user._id),
    files: filesBuffer,
  });
  //Updating changes to user
  const user = await getUserById(req.user._id);
  console.log("User is: ", user);
  const userUploads = [...user.uploads];
  userUploads.push(paper._id);
  await User.updateOne(
    { _id: req.user.id },
    { uploads: userUploads },
    (err, docs) => {
      if (err) {
        console.log("Error while updating user: ", err);
      } else console.log("User updated successfully");
    }
  )
    .clone()
    .catch((err) => {
      console.log("Error while updating user: ", err);
    });

  console.log("Saving file....");
  await paper
    .save()
    .then((result) => {
      //console.log(result);
      console.log("File saved!");
    })
    .catch((err) => {
      console.log("Error in saving paper: ", err);
    });
  res.status(201).render("success", {
    successMessage: "The file was uploaded successfully!",
    user: req.user,
  });
};
