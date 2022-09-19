const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/login", userController.getLoginPage);
router.get("/signup", userController.getSignUpPage);

router.explore;

router.get("/paper/:paperId", userController.getPaperById);

router.get("/upload", (req, res, next) => {});
router.post("/upload", userController.postUploadFile);

module.exports = router;
