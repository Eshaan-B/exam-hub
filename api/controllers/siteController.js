exports.getIndex = (req, res, next) => {
  res.render("site/index");
};

exports.getContact = (req, res, next) => {
  res.render("site/contact");
};

exports.getAbout = (req, res, next) => {
  res.render("site/about");
};
