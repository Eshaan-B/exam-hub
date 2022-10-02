const File = require("../models/file");
const mongoose = require("mongoose");

exports.googleLogin = (req, res, next) => {};

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login");
};
exports.postLogin = (req, res, next) => {};
exports.getSignUpPage = (req, res, next) => {
  res.render("auth/signup");
};
exports.getUserProfile = (req, res, next) => {};

exports.postUploadFile = (req, res, next) => {};
