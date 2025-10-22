const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Fetched users:", users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Server error" });
  }
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
