const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const router = express.Router();

router.get("/login", userController.getLoginPage);

router.get("/admin", (req, res, next) => {
  res.render("auth/admin");
});

//==================GOOGLE====================================n
router.get(
  "/loginGoogle",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
//does serializing too
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

router.get("/user/:userId", userController.getUserProfile);

module.exports = router;
