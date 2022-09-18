const express = require("express");
const fileController = require("../controllers/fileController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", fileController.getExplore);

router.get("/action", fileController.getUploadOrDownload);

router.post("/upload", upload.single("file"), fileController.postUpload);

module.exports = router;
