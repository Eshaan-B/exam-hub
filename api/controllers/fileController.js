exports.getExplore = (req, res, next) => {
  res.render("explore");
};

exports.getUploadOrDownload = (req, res, next) => {
  const mode = req.query.mode;
  res.render("papers/uploadDownload", { mode: mode });
};

exports.postUpload = (req, res, next) => {
  const subject = req.body.subject;
  res.send(subject);
};
