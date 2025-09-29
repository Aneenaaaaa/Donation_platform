const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  phone: String,
  email: String,
  password: String,
  status: { type: String, enum: ["active", "blocked"], default: "active" }
});
module.exports = mongoose.model("User", userSchema, "users");

const User = mongoose.model("User", userSchema);

// Get all users
router.get("/", async (req, res) => {
    try{ 
  const users = await User.find();
  res.json(users);
   } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Block user
router.put("/:id/block", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { status: "blocked" },
    { new: true }
  );
  res.json(updated);
});

// Unblock user
router.put("/:id/unblock", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { status: "active" },
    { new: true }
  );
  res.json(updated);
});

// Delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
