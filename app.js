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
const app = express();

mongoose.connect(
  "mongodb+srv://examHub:" +
    process.env.MONGO_ATLAS_PWD +
    "@examhub.mwatb2a.mongodb.net/?retryWrites=true&w=majority"
);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index.ejs");
  console.log(process.env.MONGO_ATLAS_PWD);
});

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(errorController.get404);

module.exports = app;
