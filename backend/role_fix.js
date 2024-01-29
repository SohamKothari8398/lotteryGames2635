require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/userModel");

mongoose
  .connect(process.env.MONGO || "mongodb://localhost:27017/up365gaming")
  .then(() => {
    console.log("Connected to MongoDB");
    User.findOne({ userID: "admin@1234", mobileNumber: 1234567890 })
      .then((user) => {
        if (user) {
          user.role = "admin";
          user
            .save()
            .then(() => {
              console.log("Role updated");
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
