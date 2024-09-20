const fs = require("fs");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("./../../models/tourModel");
const User = require("./../../models/userModel");
const Rview = require("./../../models/reviewModel");
const Review = require("./../../models/reviewModel");

DB = process.env.LOCALDB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("DB connected"))
  .catch((e) => console.log("error", e));

const tourData = JSON.parse(
  fs.readFileSync(__dirname + "/tours.json", "utf-8")
);
const userData = JSON.parse(
  fs.readFileSync(__dirname + "/users.json", "utf-8")
);
const reviewData = JSON.parse(
  fs.readFileSync(__dirname + "/reviews.json", "utf-8")
);

importData = async (_) => {
  try {
    await Tour.create(tourData);
    await User.create(userData, { validateBeforeSave: false });
    await Review.create(reviewData);
    process.exit();
  } catch (err) {
    console.log("err:", err);
  }
};

deleteData = async (_) => {
  try {
    await Tour.deleteMany();
    process.exit();
  } catch (err) {
    console.log("err:", err);
  }
};

console.log(process.argv);
//   importTourData()
// deleteTourData()

if (process.argv[2] == "--import") {
  importData();
}
if (process.argv[2] == "--delete") {
  deleteData();
}
