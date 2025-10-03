const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===== MULTER SETUP (Profile Image Upload) =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage });

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== MODELS =====
const User = require("./models/User");
const Campaign = require("./models/Campaign");
const Donation = require("./models/Donation");
const NgoUser = require("./models/NgoUser"); // ✅ new import

// ===== MONGO CONNECTION =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// ===== AUTH ROUTES =====

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ username, phone, email, password });
    await newUser.save();

    res.json({ message: "✅ Registration successful", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }); // plain text check (⚠️ should use bcrypt later)
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    res.json({ message: "✅ Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== USERS =====

// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile (username, email, bio, image)
app.put("/users/:id", upload.single("image"), async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const updateData = { username, email, bio };

    // If image uploaded, save path
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== CAMPAIGNS =====

// // Get all campaigns with NGO name
// app.get("/api/campaigns", async (req, res) => {
//   try {
//     const campaigns = await Campaign.find()
//       .populate("ngoId", "orgName") // ✅ populate NGO name
//       .lean();
//     res.json(campaigns);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get("/api/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("ngoId", "orgName")
      .sort({ createdAt: 1 }) // oldest → newest
      .lean();

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add campaign
app.post("/api/campaigns", async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.json(newCampaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== DONATIONS =====

// Create donation
app.post("/api/donations", async (req, res) => {
  try {
    const {
      donorId,
      campaignId,
      donorName,
      donorEmail,
      donorPhone,
      donorAddress,
      donationType,
      amount,
      paymentMethod,
      transactionId,
      details,
      message,
      isAnonymous
    } = req.body;

    // get campaign to fetch NGO ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    const newDonation = new Donation({
      donorId,
      campaignId,
      ngoId: campaign.ngoId,
      donorName,
      donorEmail,
      donorPhone,
      donorAddress,
      donationType,
      amount,
      paymentMethod,
      transactionId,
      details,
      message,
      isAnonymous
    });

    await newDonation.save();
    res.json({ message: "✅ Donation recorded", donation: newDonation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Get donations by donor
// app.get("/api/donations/donor/:donorId", async (req, res) => {
//   try {
//     const donations = await Donation.find({ donorId: req.params.donorId })
//       .populate("campaignId");
//     res.json(donations);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get donations by NGO
app.get("/api/donations/ngo/:ngoId", async (req, res) => {
  try {
    const donations = await Donation.find({ ngoId: req.params.ngoId })
      .populate("campaignId");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// app.get("/api/donations/donor/:donorId", async (req, res) => {
//   try {
//     const donations = await Donation.find({ donorId: req.params.donorId })
//       .populate({ path: "campaignId", select: "title" })
//       .populate({ path: "ngoId", select: "orgName" })
//       .lean();

//     res.json(donations);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// GET donations by donor with nested NGO population
app.get("/api/donations/donor/:donorId", async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.params.donorId })
      .populate({
        path: "campaignId",
        select: "title ngoId",            // include NGO reference
        populate: { path: "ngoId", select: "orgName" } // nested populate
      })
      .lean();

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// DELETE /api/donations/:id
app.delete("/api/donations/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ error: "Donation not found" });

    const now = new Date();
    const donationDate = new Date(donation.donationDate);
    const diffDays = Math.floor((now - donationDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 5) {
      return res.status(400).json({ error: "Cannot cancel donation after 5 days" });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Donation cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));














