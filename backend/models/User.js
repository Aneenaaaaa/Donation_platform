const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  phone: String,
  email: String,
  password: String,
  status: { type: String, enum: ["active", "blocked"], default: "active" }
});

// 👇 explicitly point to "users" collection
module.exports = mongoose.model("User", userSchema, "users");
