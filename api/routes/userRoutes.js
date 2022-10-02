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
//does serializing and stuff
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/explore?mode=download");
  }
);
//================FACEBOOK======================================
router.get("/loginFacebook", userController.getSignUpPage);

//===============LOGOUT=============================

router.get("/logout", (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
