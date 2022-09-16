const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.use("/about", (req, res, next) => {});

router.use("/contact", (req, res, next) => {});

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get("/paper/:paperId", userController.getPaperById);

router.get("/upload", (req, res, next) => {});
router.post("/upload", userController.postUploadFile);

module.exports = router;
