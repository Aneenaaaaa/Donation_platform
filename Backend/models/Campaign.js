

const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  category: { type: String },
  imageUrl: { type: String },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NgoUser" } // ✅ linked to NGO
});

module.exports = mongoose.model("Campaign", campaignSchema);

