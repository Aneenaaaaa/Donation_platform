const mongoose = require("mongoose");

const ngoUserSchema = new mongoose.Schema({
  orgName: String,
  regNumber: String,
  email: String,
  username: String,
  password: String,
  address: String,
  phone: String
});

module.exports = mongoose.model("NGOUser", ngoUserSchema, "ngouser");
