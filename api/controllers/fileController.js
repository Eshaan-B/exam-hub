const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const File = require("../models/file");
const User = require("../models/user");
const checkExtension = require("../utils/checkExtension");
const savePaper = require("../utils/savePaper");
//const { merge } = require("merge-pdf-buffers");
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
  const filename = "Doc";
  if (doc != null) {
    res
      .setHeader("Content-disposition", `attachment; filename=${filename}`)
      .send(doc[0]);
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

  let fileType;
  var multipleFilesName = "";
  const pdfBuffers = [];
  let filename = "";
  //single file upload
  if (typeof req.body.paper === "string") {
    console.log("Single file upload");

    filename = JSON.parse(req.body.paper).name;
    filesBuffer.push(
      new Buffer.from(JSON.parse(req.body.paper).data, "base64")
    );
    fileType = JSON.parse(req.body.paper).type;
  } else {
    //MULTI FILE UPLOAD
    // console.log("Reached mutiple file upload");
    // fileType = "pdf";
    // let papersJSON = req.body.paper;
    // papersJSON.forEach((myPaper) => {
    //   if (multipleFilesName === "") {
    //     console.log("Paper name: ", JSON.parse(myPaper).name);
    //     multipleFilesName = JSON.parse(myPaper).name;
    //     multipleFilesName = multipleFilesName.split(".")[0] + ".pdf";
    //     console.log("New multipleFilesName: ", multipleFilesName);
    //   }
    //   //logic to convert image buffer to pdf buffer
    //   const img = new Canvas.Image();
    //   img.src = Buffer.from(JSON.parse(myPaper).data, "base64");
    //   const canvas = Canvas.createCanvas(img.width, img.height, "pdf");
    //   const context = canvas.getContext("2d");
    //   img.onload = function () {
    //     context.drawImage(img, 0, 0, img.width, img.height);
    //   };
    //   pdfBuffers.push(canvas.toBuffer());
    //   let buff = new Buffer.from(JSON.parse(myPaper).data, "base64");
    //   console.log("Converting to pdf...");
    // });
    // let merged;
    // if (pdfBuffers.length > 0) {
    //   console.log("Merging pdfs.....");
    //   //merged = await merge(pdfBuffers);
    //   filesBuffer.push(merged);
    // }
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
  console.log("Single filename set to: ", filename);
  console.log("Multiple filename set to: ", multipleFilesName);
  filename =
    req.body.subject +
    "_" +
    req.body.grade +
    "_" +
    req.body.board +
    "_" +
    req.body.year;

  console.log(filename);
  return res.status(201).render("success", {
    successMessage: "The file was uploaded successfully!",
    user: req.user,
  });
  const paper = new File({
    _id: new mongoose.Types.ObjectId(),
    type: fileType,
    filename: filename === "" ? multipleFilesName : filename,
    subject: req.body.subject,
    grade: req.body.grade,
    board: req.body.board,
    approved: false,
    user: mongoose.Types.ObjectId(req.user._id),
    files: filesBuffer,
    year: req.body.year,
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
