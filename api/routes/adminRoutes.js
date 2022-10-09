const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

router.get("/", adminController.getAdminPanel);

module.exports = router;
