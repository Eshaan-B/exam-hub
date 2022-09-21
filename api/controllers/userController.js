const File = require("../models/file");
const mongoose = require("mongoose");

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login");
};
exports.postLogin = (req, res, next) => {};
exports.getSignUpPage = (req, res, next) => {
  res.render("auth/signup");
};
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

exports.postUploadFile = (req, res, next) => {};
