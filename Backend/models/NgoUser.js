const mongoose = require("mongoose");

const ngoUserSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  regNumber: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model("NgoUser", ngoUserSchema);
