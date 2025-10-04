const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");  

// GET all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
