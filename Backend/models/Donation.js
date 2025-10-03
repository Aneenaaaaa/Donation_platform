const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NgoUser", required: true },
// from campaign.ngoId
  donorName: String,
  donorEmail: String,
  donorPhone: String,
  donorAddress: String,
  donationType: { type: String, required: true },
  amount: Number, // for money type
  paymentMethod: String,
  transactionId: String,
  details: String, // for non-money donation
  message: String,
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);



        