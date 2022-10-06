const File = require("../models/file");
const User = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

exports.googleLogin = (req, res, next) => {};

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login");
};
exports.postLogin = (req, res, next) => {};
exports.getSignUpPage = (req, res, next) => {
  res.render("auth/signup");
};
exports.getUserProfile = async (req, res, next) => {
  const userId = new ObjectId(req.params.userId);
  const doc = await User.find({ _id: userId });
  const user = doc[0];
  if (doc != null) {
    console.log("User found");
  } else {
    console.log("doc not found");
    res.redirect("/");
  }

  res.render("auth/profile", { mode: null, user: user });
};

exports.postUploadFile = (req, res, next) => {};
