const authCheck = (req, res, next) => {
  if (!req.user) {
    console.log(req.user);
    res.redirect("/auth/login");
  } else next();
};

module.exports = authCheck;
