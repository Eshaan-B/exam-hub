//spins up the express application
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./api/config/passport-setup");
const userRoutes = require("./api/routes/userRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const errorController = require("./api/controllers/errorController");
const siteRoutes = require("./api/routes/siteRoutes");
const fileRoutes = require("./api/routes/fileRoutes");
const file = require("./api/models/file");
const cookieSession = require("cookie-session");
require("dotenv").config();
const app = express();
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://examHub:" +
    process.env.MONGO_ATLAS_PWD +
    "@examhub.mwatb2a.mongodb.net/?retryWrites=true&w=majority"
);
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: false, limit: "16mb" }));

app.use(express.static(path.join(__dirname, "public")));

app.use(siteRoutes);
app.use("/auth", userRoutes);
app.use("/explore", fileRoutes);
app.use("/admin", adminRoutes);
app.use(errorController.get404);

module.exports = app;
