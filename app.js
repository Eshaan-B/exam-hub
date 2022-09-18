//spins up the express application

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/userRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const errorController = require("./api/controllers/errorController");
const siteRoutes = require("./api/routes/siteRoutes");
const fileRoutes = require("./api/routes/fileRoutes");
const file = require("./api/models/file");

const app = express();

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(siteRoutes);
app.use("/explore", fileRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(errorController.get404);

module.exports = app;
