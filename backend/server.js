// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Razorpay = require("razorpay");
const crypto = require("crypto");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// --------------------
// Schemas
// --------------------
const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

const ngoSchema = new mongoose.Schema(
  {
    orgName: String,
    regNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    address: String,
    phone: String,
  },
  { collection: "ngouser" }
);
const NGO = mongoose.model("NGO", ngoSchema);

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    passwordHash: String,
  },
  { collection: "admin" }
);
const Admin = mongoose.model("Admin", adminSchema);

// --------------------
// Payment Schema
// --------------------
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  amount: Number,
  method: String, // card, upi, wallet, netbanking
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: { type: String, default: "pending" }, // pending, success, failed
  createdAt: { type: Date, default: Date.now },
});
const Payment = mongoose.model("Payment", paymentSchema);

// --------------------
// Razorpay instance
// --------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --------------------
// Routes
// --------------------

// User Registration
app.post("/register", async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ error: "Email already registered" });

    const user = await new User({ username, phone, email, password }).save();
    res.json({ message: "User registered", user: { id: user._id, username: user.username, type: "user" } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ error: "Invalid credentials" });

    res.json({ user: { id: user._id, username: user.username, type: "user" } });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// NGO Registration/Login
app.post("/ngoregister", async (req, res) => {
  try {
    const { orgName, regNumber, email, username, password, address, phone } = req.body;
    if (await NGO.findOne({ $or: [{ username }, { email }, { regNumber }] }))
      return res.status(400).json({ error: "Already exists" });

    const ngo = await new NGO({ orgName, regNumber, email, username, password, address, phone }).save();
    res.json({ message: "NGO registered", ngo: { id: ngo._id, username: ngo.username, type: "ngo" } });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/ngologin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const ngo = await NGO.findOne({ username });
    if (!ngo || ngo.password !== password)
      return res.status(400).json({ error: "Invalid credentials" });

    res.json({ ngo: { id: ngo._id, username: ngo.username, type: "ngo" } });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Login
app.post("/adminlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ name: username });
    if (!admin || admin.passwordHash !== password)
      return res.status(400).json({ error: "Invalid credentials" });

    res.json({ admin: { id: admin._id, username: admin.name, type: "admin" } });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------
// Payment Routes
// --------------------

// Create Razorpay Order
app.post("/create-order", async (req, res) => {
  try {
    const { amount, userId, username, method } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount required" });

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      userId,
      username,
      amount,
      method,
      razorpay_order_id: order.id,
      status: "created",
    });
    await payment.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Payment
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    const payment = await Payment.findOne({ razorpay_order_id });

    if (generated_signature === razorpay_signature) {
      payment.razorpay_payment_id = razorpay_payment_id;
      payment.status = "success";
      await payment.save();
      res.json({ status: "success" });
    } else {
      payment.status = "failed";
      await payment.save();
      res.status(400).json({ status: "failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

// Get Payment History
app.get("/payments/:userId", async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch payments" });
  }
});

// --------------------
// Live Chat (Socket.IO)
// --------------------
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("join", async ({ type, username, id }) => {
    try {
      let valid = null;

      if (type === "user") valid = await User.findOne({ _id: id, username });
      if (type === "ngo") valid = await NGO.findOne({ _id: id, username });
      if (type === "admin") valid = await Admin.findOne({ _id: id, name: username });

      if (!valid && type !== "guest") {
        console.log("❌ Unauthorized join attempt:", username);
        socket.emit("receiveMessage", { user: "System", text: "Unauthorized" });
        socket.disconnect();
        return;
      }

      socket.username = username;
      socket.type = type;

      socket.emit("receiveMessage", { user: "System", text: `Welcome ${username} (${type})` });
      io.emit("receiveMessage", { user: "System", text: `${username} joined the chat` });
    } catch (err) {
      console.error("Join error:", err);
    }
  });

  socket.on("sendMessage", (text) => {
    if (!socket.username) return;
    io.emit("receiveMessage", { user: socket.username, text, type: socket.type || "user" });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("receiveMessage", { user: "System", text: `${socket.username} left the chat` });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
