const express = require("express");
const fileController = require("../controllers/fileController");
const authCheck = require("../utils/authCheck");
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/", authCheck, fileController.getUploadOrDownload);
router.get("/getPaperById/:paperId", authCheck, fileController.getOneById);

router.post("/upload", authCheck, fileController.postUpload);

module.exports = router;
