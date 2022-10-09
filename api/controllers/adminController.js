const File = require("../models/file");
exports.getAdminPanel = async (req, res, next) => {
  let docs = null;
  try {
    docs = await File.find({ approved: false });
    console.log("Fetched files successfully");
  } catch (err) {
    console.log(`Error occured while fetching files.... ${err}`);
  }
  res.render("admin/adminPanel", { papers: docs });
};

// /admin/:fileId?action=reject
exports.patchApproveFile = (req, res, next) => {};
// /admin/:fileId?action=approve
exports.patchRejectFile = (req, res, next) => {};
