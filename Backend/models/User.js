
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  imageUrl: { type: String, default: "" } // new field for image path
});

module.exports = mongoose.model("User", userSchema);
