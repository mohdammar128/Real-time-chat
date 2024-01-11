const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "../data/profile.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
