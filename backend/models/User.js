const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  phone: String,
  email: String,
  password: String,
  status: { type: String, enum: ["active", "blocked"], default: "active" }
});

// Reuse the model if it already exists
module.exports = mongoose.models.User || mongoose.model("User", userSchema, "users");
