const express = require("express");
const fileController = require("../controllers/fileController");
const router = express.Router();

router.get("/", fileController.getExplore);

router.get("/action", fileController.getUploadOrDownload);

router.post("/upload", fileController.postUpload);

module.exports = router;
