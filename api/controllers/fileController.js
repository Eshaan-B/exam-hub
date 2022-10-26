const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const File = require("../models/file");
const User = require("../models/user");
const checkExtension = require("../utils/checkExtension");
const savePaper = require("../utils/savePaper");
const file = require("../models/file");
// const Canvas = require("canvas");

exports.getExplore = (req, res, next) => {
  res.render("explore");
};

async function getByFilter(req) {}
async function getAllFiles(filters) {
  var docs = null;
  try {
    docs = await File.find(filters);
    console.log("Fetched files successfully");
  } catch (err) {
    console.log(`Error occured while fetching files.... ${err}`);
  }

  //console.log(docs[1]["file"]);
  //Download it like this:
  return docs;
}

async function getUserById(userId) {
  const doc = await User.find({ _id: userId });
  if (doc != null) return doc[0];
  console.log("User not found");
}
exports.getExplore = (req, res, next) => {
  res.render("explore");
};

exports.getOneOfBatch = async (req, res, next) => {
  const paperId = new ObjectId(req.params.paperId);
  const doc = await File.find({ _id: paperId });
  const filename = doc[0]["filename"];
  const paperIndex = req.params.paperIndex;
  if (doc != null) {
    res
      .setHeader("Content-disposition", `attachment; filename=${filename}`)
      .send(doc[0].files[paperIndex]);
  } else {
    console.log("Doc not found");
    res.redirect("/");
  }
};

exports.getOneById = async (req, res, next) => {
  const paperId = new ObjectId(req.params.paperId);
  const doc = await File.find({ _id: paperId });

  const filename = await doc[0]["filename"];

  if (doc != null) {
    console.log("File found");
    //  res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    let splitFileName = filename.split(" ");
    res
      .setHeader("Content-disposition", `attachment; filename=${filename}`)
      .send(doc[0].files[0]);
  } else {
    console.log("doc not found");
    res.redirect("/");
  }
};

exports.getUploadOrDownload = async (req, res, next) => {
  let filters = req.body;
  const mode = req.query.mode;
  let papers = [];
  if (mode === "download") {
    filters.approved = true;
    console.log("Filters are: ", filters);
    papers = await getAllFiles(filters);
    if (papers.length == 0) console.log("no files to show");
  }
  res.render("papers/uploadDownload", {
    mode: mode,
    papers: papers,
    user: req.user,
    grade: "XII",
    board: req.body.board,
    subject: req.body.subject,
    grade: req.body.grade,
  });
};

exports.postUpload = async (req, res, next) => {
  console.log("Reached PostUploadFile");

  const filesBuffer = [];
  const buffersList = [];
  let fileType;
  var multipleFilesName = "";
  let filename =
    req.body.subject +
    "_" +
    req.body.grade +
    "_" +
    req.body.board +
    "_" +
    req.body.year;
  let multiple = false;
  //single file upload
  if (typeof req.body.paper === "string") {
    multiple = false;
    let splitname = JSON.parse(req.body.paper).name.split(".");
    filename = filename + "." + splitname[1];
    console.log("filename is -- ", filename);

    filesBuffer.push(
      new Buffer.from(JSON.parse(req.body.paper).data, "base64")
    );
    fileType = JSON.parse(req.body.paper).type;
  } else {
    //MULTI FILE UPLOAD
    multiple = true;
    console.log("Reached mutiple file upload");
    // fileType = "pdf";
    let papersJSON = req.body.paper;
    papersJSON.forEach((myPaper, i) => {
      let splitname = JSON.parse(myPaper).name.split(".");
      if (i == 0) {
        filename = filename + "." + splitname[1];
      }
      console.log(`file name: ${filename}`);
      filesBuffer.push(new Buffer.from(JSON.parse(myPaper).data, "base64"));
    });
  }
  // var filename =
  //   filesBuffer.length == 1
  //     ? JSON.parse(req.body.paper).name
  //     : multipleFilesName;

  // const extension = checkExtension(filename);
  // if (extension == null) {
  //   req.extensionError = "Invalid file. Kindly upload pdf only";
  //   return res.status(301).render("error", {
  //     errorMessage:
  //       "Invalid file extension. Supported filetypes are: pdf, jpg, jpeg, png, doc, docx",
  //   });
  // }

  // const subject = req.body.subject;
  // const grade = req.body.grade;
  // const board = req.body.board;
  // console.log(subject, grade, board);
  console.log("Filename set to: ", filename);
  // filename =
  //   req.body.subject +
  //   "_" +
  //   req.body.grade +
  //   "_" +
  //   req.body.board +
  //   "_" +
  //   req.body.year;
  // +".pdf";

  console.log(filename);

  const paper = new File({
    _id: new mongoose.Types.ObjectId(),
    type: fileType,
    filename: filename === "" ? multipleFilesName : filename,
    subject: req.body.subject,
    grade: req.body.grade,
    board: req.body.board,
    approved: false,
    user: mongoose.Types.ObjectId(req.user._id),
    multiple: multiple,
    files: filesBuffer,
    year: req.body.year,
    description: req.body.description,
  });
  //Updating changes to user
  const user = await getUserById(req.user._id);
  // console.log("User is: ", user);
  const userUploads = [...user.uploads];
  userUploads.push(paper._id);
  await User.updateOne(
    { _id: req.user.id },
    { uploads: userUploads },
    (err, docs) => {
      if (err) {
        //   console.log("Error while updating user: ", err);
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
