const File = require("../models/file");
const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

router.get("/", adminController.getAdminPanel);
router.get("/approve/:paperId", async (req, res, next) => {
  const paperId = req.params.paperId;
  await File.updateOne({ _id: paperId }, { approved: true }, (err, docs) => {
    if (err) {
      console.log("Error while approving file: ", err);
    } else console.log("File approved successfully");
  })
    .clone()
    .catch((err) => {
      console.log("Error while updating user: ", err);
    });
  res.redirect("/admin");
});
router.get("/deny/:paperId", async (req, res, next) => {
  const paperId = req.params.paperId;
  try {
    await File.deleteOne({ _id: paperId });
  } catch (err) {
    console.log("Error while deleting: ", err);
  }
  res.redirect("/admin");
});

module.exports = router;
