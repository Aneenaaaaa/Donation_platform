// backend/routes/dashboard.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const activeCampaigns = await Campaign.countDocuments({ status: "approved" });

    res.json({
      totalUsers,
      totalDonations: totalDonations[0]?.total || 0,
      activeCampaigns
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
