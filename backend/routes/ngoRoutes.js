const express = require("express");
const router = express.Router();
const NGOUser = require("../models/ngouser"); 

router.get("/", async (req, res) => {
  try {
    const ngos = await NGOUser.find({}, { password: 0 }); // exclude password
    res.status(200).json(ngos);
  } catch (error) {
    console.error("Error fetching NGO users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

