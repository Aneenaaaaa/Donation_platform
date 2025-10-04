const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  goal: Number,
  startDate: Date,
  endDate: Date,
  category: String,
  imageUrl: String,
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "active" }
});

module.exports = mongoose.model("Campaign", campaignSchema);
