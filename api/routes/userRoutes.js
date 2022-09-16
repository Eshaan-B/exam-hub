const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.use("/about", (req, res, next) => {});

router.use("/contact", (req, res, next) => {});

router.get("/", (req, res, next) => {
  res.send("admin");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/login", userController.postLogin);

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

module.exports = router;
