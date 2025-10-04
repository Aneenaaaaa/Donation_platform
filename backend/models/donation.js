const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  donorName: String,
  donorEmail: String,
  donorPhone: String,
  donorAddress: String,

  donationType: String,
  amount: Number,
  paymentMethod: String,
  transactionId: String,
  message: String,
  isAnonymous: Boolean,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
