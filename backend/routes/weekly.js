const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");

// GET /api/donations/weekly-count
router.get("/weekly-count", async (req, res) => {
  try {
    const weeklyCounts = await Donation.aggregate([
      // Group by year + week of createdAt
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" }
          },
          donationCount: { $sum: 1 } // count all donations
        }
      },
      {
        $project: {
          year: "$_id.year",
          week: "$_id.week",
          donationCount: 1,
          _id: 0
        }
      },
      { $sort: { year: 1, week: 1 } }
    ]);

    res.json(weeklyCounts);
  } catch (err) {
    console.error("Weekly count error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/donations/type-distribution
router.get("/type-distribution", async (req, res) => {
  try {
    const typeCounts = await Donation.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $in: ["$donationType", ["money","food","clothes","books"]] },
              "$donationType",
              "others"
            ]
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          donationType: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(typeCounts);
  } catch (err) {
    console.error("Donation type distribution error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
