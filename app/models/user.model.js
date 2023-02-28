const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    address: String
  })
);

module.exports = User;
