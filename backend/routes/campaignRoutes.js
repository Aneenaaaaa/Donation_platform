const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");  // you’ll need to create this model

// GET all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update campaign status (approve/reject)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
