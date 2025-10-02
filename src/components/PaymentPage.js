import React, { useState, useEffect } from "react";
import axios from "axios";

function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) setAuthUser(user);
  }, []);

  const handlePayment = async () => {
    if (!amount || !authUser) return alert("Enter amount and login first!");

    try {
      // 1️⃣ Create order on backend
      const orderRes = await axios.post("http://localhost:5000/create-order", {
        amount,
        userId: authUser.id,
        username: authUser.username,
        method: "razorpay",
      });

      // 2️⃣ Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Donation App",
        description: "Donation Payment",
        order_id: orderRes.data.id,
        handler: async (response) => {
          // 3️⃣ Verify payment on backend
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/verify-payment",
              response
            );
            if (verifyRes.data.status === "success") alert("Payment Successful!");
            else alert("Payment Failed!");
          } catch {
            alert("Payment verification failed!");
          }
        },
        theme: { color: "#4caf50" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>💳 Make a Donation</h2>
      {!authUser && <p style={{ color: "red" }}>Please login first!</p>}
      <input
        type="number"
        placeholder="Enter Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "12px",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Pay ₹{amount || 0}
      </button>
    </div>
  );
}

export default PaymentPage;
