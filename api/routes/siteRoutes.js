const express = require("express");
const fileRoutes = require("./fileRoutes");
const siteController = require("../controllers/siteController");

const router = express.Router();

router.get("/", siteController.getIndex);
router.get("/about", siteController.getAbout);
router.get("/contact", siteController.getContact);

module.exports = router;
