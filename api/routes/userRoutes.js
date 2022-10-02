const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const router = express.Router();

router.get("/login", userController.getLoginPage);

//==================GOOGLE====================================
router.get(
  "/loginGoogle",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res, next) => {
    res.send("Reached callback uri");
  }
);
router.get("/signup", userController.getSignUpPage);

router.get("/upload", (req, res, next) => {});
router.post("/upload", userController.postUploadFile);

module.exports = router;
